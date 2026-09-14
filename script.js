document.addEventListener("DOMContentLoaded",()=> {
 const fareMap={Sirkali:"₹3,000",Chidambaram:"₹3,000",Karaikal:"₹3,500",Mayiladuthurai:"₹3,500"};
 const $=id=>document.getElementById(id);
 function fare(){ $("fare").textContent=fareMap[$("drop").value]||"Select destination"; }
 $("drop").addEventListener("change",fare); fare();

 function route(){
   const pickup=$("pickup").value.trim(), drop=$("drop").value;
   if(!pickup||!drop){alert("Please enter Pickup Location and select Drop Location.");return;}
   const url="https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(pickup)+"&destination="+encodeURIComponent(drop+", Tamil Nadu");
   window.open(url,"_blank","noopener");
 }
 $("maps").addEventListener("click",route);

 $("bookingForm").addEventListener("submit",e=>{
   e.preventDefault();
   const mobile=$("mobile").value.trim();
   if(!/^[0-9]{10}$/.test(mobile)){alert("Please enter a valid 10-digit mobile number.");return;}
   const pickup=$("pickup").value.trim(),drop=$("drop").value;
   if(!pickup||!drop){alert("Please enter Pickup and Drop Location.");return;}
   const map="https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(pickup)+"&destination="+encodeURIComponent(drop+", Tamil Nadu");
   const msg=`🚕 IFRAH CABS - SHARE TAXI BOOKING

Name: ${$("name").value.trim()}
Mobile: ${mobile}
Travel Date: ${$("date").value}
Pickup: ${pickup}
Drop: ${drop}
Passengers: ${$("passengers").value}
Pickup Time: ${$("time").value}
Share Taxi Fare: ${fareMap[drop]||"Fare to be confirmed"}

🗺️ Google Maps Route:
${map}`;
   window.open("https://wa.me/918940694977?text="+encodeURIComponent(msg),"_blank","noopener");
 });
});