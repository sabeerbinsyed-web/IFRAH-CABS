const form=document.getElementById("bookingForm");
const result=document.getElementById("result");
const date=document.getElementById("date");
date.min=new Date().toISOString().split("T")[0];

function money(n){return "₹"+Math.round(n).toLocaleString("en-IN");}

function routeFare(drop){
  const route=drop.toLowerCase();
  if(route.includes("sirkali")) return 3000;
  if(route.includes("chidambaram")) return 3000;
  if(route.includes("mayiladuthurai")) return 3500;
  if(route.includes("karaikal")) return 3500;
  return 0;
}

form.addEventListener("submit",e=>{
 e.preventDefault();
 const pickup=document.getElementById("pickup").value.trim();
 const drop=document.getElementById("drop").value.trim();
 const d=document.getElementById("date").value;
 const t=document.getElementById("time").value;
 const p=Number(document.getElementById("passengers").value);
 const base=routeFare(drop);
 const fare=base ? base*p : 0;
 const fareText=fare ? money(fare) : "Fare to be confirmed";

 const msg=`SHOREWAY SHARE TAXI BOOKING\n\nService: Share Taxi\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${d}\nTime: ${t}\nPassengers: ${p}\nEstimated Fare: ${fareText}\n\nPlease confirm seat availability and final fare.`;

 result.classList.remove("hidden");
 result.innerHTML=`<b>Estimated Fare: ${fareText}</b><br>Share Taxi • ${pickup} → ${drop}<br><small>Final fare and seat availability will be confirmed on WhatsApp.</small><br><br><a class="primary" href="https://wa.me/918940694977?text=${encodeURIComponent(msg)}" target="_blank">CONFIRM ON WHATSAPP</a>`;
 result.scrollIntoView({behavior:"smooth",block:"center"});
});