const form=document.getElementById("bookingForm");
const result=document.getElementById("result");
const date=document.getElementById("date");
date.min=new Date().toISOString().split("T")[0];

form.addEventListener("submit",e=>{
 e.preventDefault();
 const service=document.getElementById("service").value;
 const pickup=document.getElementById("pickup").value.trim();
 const drop=document.getElementById("drop").value.trim();
 const d=document.getElementById("date").value;
 const t=document.getElementById("time").value;
 const p=document.getElementById("passengers").value;
 const fare="Fare will be confirmed by SHOREWAY";
 const msg=`SHOREWAY CAB BOOKING%0A%0AService: ${service}%0APickup: ${encodeURIComponent(pickup)}%0ADrop: ${encodeURIComponent(drop)}%0ADate: ${d}%0ATime: ${t}%0APassengers: ${p}%0A%0A${fare}`;
 result.classList.remove("hidden");
 result.innerHTML=`<b>Booking details ready.</b><br>${service} • ${pickup} → ${drop}<br><br><a class="primary" href="https://wa.me/918940694977?text=${msg}" target="_blank">CONFIRM ON WHATSAPP</a>`;
 result.scrollIntoView({behavior:"smooth",block:"center"});
});