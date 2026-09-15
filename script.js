import{initializeApp}from"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";import{getFirestore,collection,addDoc,serverTimestamp}from"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const firebaseConfig={apiKey:"AIzaSyD2yBDsxqzHmHzXy-G9r30uUuNSquDVmZYM",authDomain:"ifrah-cabs.firebaseapp.com",projectId:"ifrah-cabs",storageBucket:"ifrah-cabs.firebasestorage.app",messagingSenderId:"1058171424992",appId:"1:1058171424992:web:08cfe92a8ab95f014ec085"};const db=getFirestore(initializeApp(firebaseConfig));const $=id=>document.getElementById(id);
const fares={sirkali:"₹3,000",chidambaram:"₹3,000",karaikal:"₹3,500",mayiladuthurai:"₹3,500"};
function update(){let s=$("service").value,show=s==="One Way"||s==="Round Trip";$("vehicleWrap").hidden=!show;$("vehicle").required=show;$("fareType").textContent=s;let d=$("drop").value.trim().toLowerCase();$("fare").textContent=s==="Share Taxi"?(fares[d]||"Fare to be confirmed"):s==="One Way"?"₹15/km + ₹400 allowance":"Fare to be confirmed"}$("service").onchange=update;$("drop").oninput=update;update();$("date").min=new Date().toISOString().split("T")[0];

function setupPlaceSearch(inputId,resultsId){
  const input=$(inputId), results=$(resultsId);
  let timer;
  input.addEventListener("input",()=>{
    clearTimeout(timer);
    const q=input.value.trim();
    results.innerHTML="";
    if(q.length<2)return;
    results.innerHTML='<div class="searching">🔎 Searching places...</div>';
    timer=setTimeout(async()=>{
      try{
        const url="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&countrycodes=in&addressdetails=1&q="+encodeURIComponent(q);
        const res=await fetch(url,{headers:{"Accept-Language":"en"}});
        const data=await res.json();
        results.innerHTML="";
        if(!data.length){
          results.innerHTML='<div class="searching">Place not found. Type the full location.</div>';
          return;
        }
        data.forEach(item=>{
          const b=document.createElement("button");
          b.type="button";
          b.textContent=item.display_name;
          b.onclick=()=>{
            input.value=item.display_name;
            results.innerHTML="";
            if(inputId==="drop")update();
          };
          results.appendChild(b);
        });
      }catch(e){
        results.innerHTML='<div class="searching">Search unavailable. You can type the place manually.</div>';
      }
    },450);
  });
  document.addEventListener("click",e=>{
    if(!e.target.closest(".place-search"))results.innerHTML="";
  });
}
setupPlaceSearch("pickup","pickupResults");
setupPlaceSearch("drop","dropResults");

function map(){return"https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent($("pickup").value.trim())+"&destination="+encodeURIComponent($("drop").value.trim())}
$("mapBtn").onclick=()=>{if(!$("pickup").value.trim()||!$("drop").value.trim())return alert("முதலில் Pickup மற்றும் Drop Location உள்ளிடுங்கள்.");open(map(),"_blank")};
$("bookingForm").onsubmit=async e=>{e.preventDefault();let m=$("mobile").value.trim(),s=$("service").value,v=$("vehicle").value;if(!/^\d{10}$/.test(m))return alert("சரியான 10 இலக்க Mobile Number உள்ளிடுங்கள்.");if((s==="One Way"||s==="Round Trip")&&!v)return alert("Vehicle Type தேர்வு செய்யுங்கள்.");let d={service:s,date:$("date").value,pickup:$("pickup").value.trim(),drop:$("drop").value.trim(),passengers:Number($("passengers").value),time:$("time").value,name:$("name").value.trim(),mobile:m,vehicle:v||"",note:$("note").value.trim(),fare:$("fare").textContent};let b=e.submitter;b.disabled=true;b.textContent="⏳ SAVING...";try{await addDoc(collection(db,"bookings"),{...d,createdAt:serverTimestamp(),status:"Pending"})}catch(err){console.error(err)}let msg=`🚕 IFRAH CABS BOOKING\n\nService: ${d.service}\nName: ${d.name}\nMobile: ${d.mobile}\nTravel Date: ${d.date}\nPickup: ${d.pickup}\nDrop: ${d.drop}\nPassengers: ${d.passengers}\nPickup Time: ${d.time}\n${s==="One Way"||s==="Round Trip"?"Vehicle Type: "+d.vehicle+"\n":""}Fare: ${d.fare}
Toll: Extra
Permit: Extra
Parking: Extra
Waiting: Extra

🗺️ Google Maps Route:
${map()}`;$("message").textContent="Booking saved. Opening WhatsApp...";open("https://wa.me/918940694977?text="+encodeURIComponent(msg),"_blank");b.disabled=false;b.textContent="💬 CONFIRM & BOOK ON WHATSAPP"};