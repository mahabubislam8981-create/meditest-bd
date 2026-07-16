import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const doctorList = document.getElementById("doctorList");
const popularDiseases = document.getElementById("popularDiseases");
const searchInput = document.getElementById("searchInput");

let doctors = [];

// সব Doctor Guide লোড
async function loadDoctors() {

  doctorList.innerHTML = "<p>লোড হচ্ছে...</p>";
  popularDiseases.innerHTML = "<p>লোড হচ্ছে...</p>";

  try {

    const snapshot = await getDocs(collection(db, "doctor_guide"));
console.log("Snapshot size:", snapshot.size);

snapshot.forEach(doc => {
  console.log(doc.id, doc.data());
});
    
    doctors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    renderDoctors(doctors);
    renderPopularDoctors();

  } catch (error) {

    console.error(error);

    doctorList.innerHTML =
      "<p>❌ ডাটা লোড করা যায়নি।</p>";

  }

}

// সব রোগ দেখানো
function renderDoctors(data) {

  if (data.length === 0) {

    doctorList.innerHTML =
      "<p>কোনো তথ্য পাওয়া যায়নি।</p>";

    return;

  }

  doctorList.innerHTML = "";

  data.forEach(item => {

    doctorList.innerHTML += `

      <div class="card">

      <h2>${item.disease}</h2>

      <p><strong>🏥 বিভাগ:</strong>
      ${item.department}</p>

      <p><strong>👨‍⚕️ ডাক্তার:</strong>
      ${item.doctor}</p>

      <p><strong>🤒 লক্ষণ:</strong>
      ${item.symptoms}</p>

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

// জনপ্রিয় রোগ
function renderPopularDoctors() {

  const popular = doctors.filter(item => item.popular === true);

  if (popular.length === 0) {

    popularDiseases.innerHTML =
      "<p>কোনো জনপ্রিয় রোগ নেই।</p>";

    return;

  }

  popularDiseases.innerHTML = "";

  popular.forEach(item => {

    popularDiseases.innerHTML += `

      <a
      href="doctor-details.html?slug=${item.slug}"
      class="details-btn"
      style="display:block;margin-bottom:10px;text-decoration:none;text-align:center;">

      🔥 ${item.disease}

      </a>

    `;

  });

}

// Live Search
searchInput.addEventListener("input", () => {

  const keyword = searchInput.value
  .trim()
  .toLowerCase();

  if (keyword === "") {

    renderDoctors(doctors);

    return;

  }

  const filtered = doctors.filter(item =>

    (item.disease || "")
    .toLowerCase()
    .includes(keyword)

    ||

    (item.department || "")
    .toLowerCase()
    .includes(keyword)

    ||

    (item.doctor || "")
    .toLowerCase()
    .includes(keyword)

    ||

    (item.symptoms || "")
    .toLowerCase()
    .includes(keyword)

    ||

    (item.description || "")
    .toLowerCase()
    .includes(keyword)

    ||

    (item.keywords || "")
    .toLowerCase()
    .includes(keyword)

  );

  renderDoctors(filtered);

});

loadDoctors();
