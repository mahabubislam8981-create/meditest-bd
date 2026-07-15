import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const disease = document.getElementById("disease");
const department = document.getElementById("department");
const doctor = document.getElementById("doctor");
const symptoms = document.getElementById("symptoms");
const description = document.getElementById("description");
const recommendedTests = document.getElementById("recommendedTests");
const note = document.getElementById("note");
const emergency = document.getElementById("emergency");

async function loadDoctor(){

try{

const snapshot = await getDocs(collection(db,"doctor_guide"));

let found=false;

snapshot.forEach(doc=>{

const data=doc.data();

if(data.slug===slug){

found=true;

disease.textContent=data.disease || "-";
department.textContent=data.department || "-";
doctor.textContent=data.doctor || "-";
symptoms.textContent=data.symptoms || "-";
description.textContent=data.description || "-";
note.textContent=data.note || "-";

emergency.textContent=
data.emergency ? "হ্যাঁ" : "না";

recommendedTests.innerHTML="";

if(Array.isArray(data.recommendedTests)){

data.recommendedTests.forEach(test=>{

recommendedTests.innerHTML += `
<p>🧪 ${test}</p>
`;

});

}

}

});

if(!found){

disease.textContent="তথ্য পাওয়া যায়নি";

}

}

catch(error){

console.error(error);

}

}

loadDoctor();
