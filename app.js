import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const testList = document.getElementById("testList");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("detailsModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSample = document.getElementById("modalSample");
const modalPreparation = document.getElementById("modalPreparation");
const modalReportTime = document.getElementById("modalReportTime");
let tests = [];

// Firestore থেকে ডাটা লোড
async function loadTests() {
  testList.innerHTML = "<p>লোড হচ্ছে...</p>";

  try {
    const snapshot = await getDocs(collection(db, "tests"));

    tests = [];

    snapshot.forEach((doc) => {
      tests.push(doc.data());
    });

    showTests(tests);

  } catch (err) {
    console.error(err);
    testList.innerHTML = "<p>ডাটা লোড করা যায়নি।</p>";
  }
}

// কার্ড দেখানো
function showTests(data) {

  if (data.length === 0) {
    testList.innerHTML = "<p>কোন তথ্য পাওয়া যায়নি।</p>";
    return;
  }

  testList.innerHTML = "";

  data.forEach((test) => {

    testList.innerHTML += `
      <div class="card">

        <h2>${test.name}</h2>

        <p>
          <strong>বিভাগ:</strong>
          ${test.category || "তথ্য নেই"}
        </p>

        <div class="price">
          ৳${test.price}
        </div>

        <button
          class="details-btn"
          data-name="${test.name}">
          বিস্তারিত দেখুন
        </button>

      </div>
    `;

  });

  // বাটনের ইভেন্ট
  document.querySelectorAll(".details-btn").forEach(btn => {

    btn.addEventListener("click", () => {

      const test = tests.find(
        t => t.name === btn.dataset.name
      );

      if (!test) return;

      modalTitle.textContent = test.name;
      modalCategory.textContent = test.category || "তথ্য নেই";
      modalPrice.textContent = test.price;
      modalDescription.textContent =
        test.description || "এই টেস্টের বিস্তারিত তথ্য এখনও যোগ করা হয়নি।";

      modal.style.display = "block";

    });

  });

}

// সার্চ
searchInput.addEventListener("input", () => {

  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = tests.filter((test) => {

    const name = (test.name || "").toLowerCase();
    const category = (test.category || "").toLowerCase();

    return (
      name.includes(keyword) ||
      category.includes(keyword)
    );

  });

  showTests(filtered);

});

// Popup বন্ধ
closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// শুরু
loadTests();
