document.addEventListener("DOMContentLoaded",function(){
const fares={sirkali:"₹3,000",chidambaram:"₹3,000",karaikal:"₹3,500",mayiladuthurai:"₹3,500"};
const $=id=>document.getElementById(id);
function selectedFare(){let d=$("drop").value.trim().toLowerCase();$("fare").textContent=fares[d]||"Fare to be confirmed";}
$("drop").addEventListener("input",selectedFare);selectedFare();
function mapUrl(){return "https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent($("pickup").value.trim())+"&destination="+encodeURIComponent($("drop").value.trim());}
$("mapBtn").addEventListener("click",function(){if(!$("pickup").value.trim()||!$("drop").value.trim()){alert("Enter Pickup and Drop Location first.");return}window.open(mapUrl(),"_blank");});
$("bookingForm").addEventListener("submit",function(e){e.preventDefault();let m=$("mobile").value.trim();if(!/^[0-9]{10}$/.test(m)){alert("Enter a valid 10-digit mobile number.");return}let msg="🚕 IFRAH CABS - SHARE TAXI BOOKING\n\nName: "+$("name").value+"\nMobile: "+m+"\nTravel Date: "+$("date").value+"\nPickup: "+$("pickup").value+"\nDrop: "+$("drop").value+"\nPassengers: "+$("passengers").value+"\nPickup Time: "+$("time").value+"\nShare Taxi Fare: "+$("fare").textContent+"\n\n🗺️ Google Maps Route:\n"+mapUrl();window.open("https://wa.me/918940694977?text="+encodeURIComponent(msg),"_blank");});
});