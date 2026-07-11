import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const testList = document.getElementById("testList");
const searchInput = document.getElementById("searchInput");

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

    displayTests(tests);

  } catch (error) {
    console.error(error);
    testList.innerHTML = "<p>ডাটা লোড করা যায়নি।</p>";
  }
}

// কার্ড দেখানো
function displayTests(data) {

  testList.innerHTML = "";

  if (data.length === 0) {
    testList.innerHTML = "<p>কোন টেস্ট পাওয়া যায়নি।</p>";
    return;
  }

  data.forEach((test) => {

    testList.innerHTML += `
      <div class="card">
        <h2>${test.name || ""}</h2>

        <p>
          <strong>বিভাগ:</strong>
          ${test.category || "তথ্য নেই"}
        </p>

        <div class="price">
          ৳${test.price || 0}
        </div>
      </div>
    `;

  });
}

// সার্চ
searchInput.addEventListener("input", function () {

  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = tests.filter(test => {

    const name = (test.name || "").toLowerCase();
    const category = (test.category || "").toLowerCase();

    return name.includes(keyword) || category.includes(keyword);

  });

  displayTests(filtered);

});

// শুরু
loadTests();
