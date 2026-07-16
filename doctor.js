import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const doctorList = document.getElementById("doctorList");
const popularDiseases = document.getElementById("popularDiseases");
const searchInput = document.getElementById("searchInput");

let doctors = [];

// সব ডাটা লোড
async function loadDoctors() {
  try {
    const snapshot = await getDocs(collection(db, "doctor_guide"));

    doctors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    renderDoctors(doctors);
    renderPopular(doctors);

    console.log("Loaded:", doctors.length);

  } catch (err) {
    console.error(err);

    doctorList.innerHTML = `
      <div class="card">
        <h3>❌ Firestore Error</h3>
        <p>${err.message}</p>
      </div>
    `;
  }
}

// সব রোগ দেখানো
function renderDoctors(list) {

  if (list.length === 0) {
    doctorList.innerHTML = `
      <div class="card">
        <h3>কোন তথ্য পাওয়া যায়নি</h3>
      </div>
    `;
    return;
  }

  doctorList.innerHTML = list.map(item => `
    <div class="card">
      <h2>${item.disease || ""}</h2>

      <p><b>👨‍⚕️ ডাক্তার:</b> ${item.doctor || ""}</p>

      <p><b>🏥 বিভাগ:</b> ${item.department || ""}</p>

      <p>${item.description || ""}</p>

      <p><b>লক্ষণ:</b> ${item.symptoms || ""}</p>

      <p><b>পরামর্শ:</b> ${item.note || ""}</p>
    </div>
  `).join("");
}

// জনপ্রিয় রোগ
function renderPopular(list) {

  const popular = list.filter(item => item.popular === true);

  if (popular.length === 0) {
    popularDiseases.innerHTML = "<p>কোন জনপ্রিয় রোগ নেই</p>";
    return;
  }

  popularDiseases.innerHTML = popular.map(item => `
    <div class="card">
      <b>${item.disease}</b>
    </div>
  `).join("");
}

// সার্চ
searchInput.addEventListener("input", e => {

  const text = e.target.value
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function test() {
  const snapshot = await getDocs(collection(db, "doctor_guide"));

  console.log(snapshot.docs);

  snapshot.docs.forEach(doc => {
    console.log(doc.id, doc.data());
  });

  alert("Documents = " + snapshot.docs.length);
}

test();
