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

    const snapshot = await getDocs(collection(db, "doctor_guide"));

    console.log("Documents:", snapshot.size);

    doctors = snapshot.docs.map(doc => doc.data());

    console.log(doctors);

    renderDoctors(doctors);

  } catch (error) {

    console.error(error);

    doctorList.innerHTML = `
      <div class="card">
        <h3>❌ Firestore Error</h3>
        <p>${error.message}</p>
      </div>
    `;

  }

}

function renderDoctors(list) {

  doctorList.innerHTML = "";

  if (list.length === 0) {

    doctorList.innerHTML = `
      <div class="card">
        <h3>কোনো তথ্য পাওয়া যায়নি</h3>
      </div>
    `;

    return;
  }

  list.forEach(item => {

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

searchInput.addEventListener("input", () => {

  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = doctors.filter(item =>

    (item.disease || "").toLowerCase().includes(keyword) ||
    (item.department || "").toLowerCase().includes(keyword) ||
    (item.doctor || "").toLowerCase().includes(keyword) ||
    (item.symptoms || "").toLowerCase().includes(keyword) ||
    (item.description || "").toLowerCase().includes(keyword) ||
    (item.keywords || "").toLowerCase().includes(keyword)

  );

  renderDoctors(filtered);

});

loadDoctors();
