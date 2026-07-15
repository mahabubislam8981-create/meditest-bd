import { db } from "./firebase.js";
import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const doctorList = document.getElementById("doctorList");
const searchInput = document.getElementById("searchInput");

let doctors = [];

async function loadDoctors() {

doctorList.innerHTML = "<p>লোড হচ্ছে...</p>";

try {

const snapshot = await getDocs(collection(db,"doctor_guide"));

doctors = snapshot.docs.map(doc=>doc.data());

renderDoctors(doctors);

}

catch(error){

console.error(error);

doctorList.innerHTML="<p>ডাটা লোড করা যায়নি।</p>";

}

}

function renderDoctors(data){

if(data.length===0){

doctorList.innerHTML="<p>কোন তথ্য পাওয়া যায়নি।</p>";

return;

}

doctorList.innerHTML += `

<div class="card">

<h2>${item.disease}</h2>

<p><strong>🏥 বিভাগ:</strong> ${item.department}</p>

<p><strong>👨‍⚕️ ডাক্তার:</strong> ${item.doctor}</p>

<p><strong>🤒 লক্ষণ:</strong> ${item.symptoms}</p>

<p>${item.description}</p>

<a href="doctor-details.html?slug=${item.slug}">
  <button class="details-btn">
    বিস্তারিত দেখুন
  </button>
</a>

</div>

`;

});

}

searchInput.addEventListener("input",()=>{

const keyword=searchInput.value.toLowerCase().trim();

const filtered=doctors.filter(item=>{

return(

(item.disease||"").toLowerCase().includes(keyword)||

(item.department||"").toLowerCase().includes(keyword)||

(item.doctor||"").toLowerCase().includes(keyword)||

(item.symptoms||"").toLowerCase().includes(keyword)||

(item.keywords||"").toLowerCase().includes(keyword)

);

});

renderDoctors(filtered);

});

loadDoctors();
