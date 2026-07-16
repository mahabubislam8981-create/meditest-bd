import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const doctorList = document.getElementById("doctorList");
const searchInput = document.getElementById("searchInput");

let doctors = [];

// Doctor Guide লোড
async function loadDoctors() {

  doctorList.innerHTML = "<p>লোড হচ্ছে...</p>";

  try {

    const snapshot = await getDocs(collection(db, "doctor_guide"));

    doctors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    renderDoctors(doctors);

  } catch (error) {

    console.error("Firestore Error:", error);

    doctorList.innerHTML = `
      <div class="card">
        <h3>❌ ডাটা লোড করা যায়নি</h3>
        <p>${error.message}</p>
      </div>
    `;

  }

}

// Card দেখানো
function renderDoctors(list) {

  doctorList.innerHTML = "";

  if (!list || list.length === 0) {

    doctorList.innerHTML = `
      <div class="card">
        <h3>কোনো তথ্য পাওয়া যায়নি</h3>
      </div>
    `;

    return;

  }

  list.forEach(item => {

    doctorList.innerHTML += `
      <div class="card">

        <h2>${item.disease || "রোগের নাম নেই"}</h2>

        <p><strong>🏥 বিভাগ:</strong> ${item.department || "-"}</p>

        <p><strong>👨‍⚕️ ডাক্তার:</strong> ${item.doctor || "-"}</p>

        <p><strong>🤒 লক্ষণ:</strong> ${item.symptoms || "-"}</p>

        <p>${item.description || ""}</p>

        <a href="doctor-details.html?slug=${item.slug}">
          <button class="details-btn">
            বিস্তারিত দেখুন
          </button>
        </a>

      </div>
    `;

  });

}

// Live Search
searchInput.addEventListener("input", function () {

  const keyword = this.value.trim().toLowerCase();

  if (keyword === "") {
    renderDoctors(doctors);
    return;
  }

  const filtered = doctors.filter(item => {

    return (

      (item.disease || "").toLowerCase().includes(keyword) ||
      (item.department || "").toLowerCase().includes(keyword) ||
      (item.doctor || "").toLowerCase().includes(keyword) ||
      (item.symptoms || "").toLowerCase().includes(keyword) ||
      (item.description || "").toLowerCase().includes(keyword) ||
      (item.keywords || "").toLowerCase().includes(keyword)

    );

  });

  renderDoctors(filtered);

});

// শুরু
loadDoctors();
