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
    const querySnapshot = await getDocs(collection(db, "tests"));

    tests = [];

    querySnapshot.forEach((doc) => {
      tests.push(doc.data());
    });

    showTests(tests);

  } catch (err) {
    testList.innerHTML = "<p>ডাটা লোড করা যায়নি।</p>";
    console.error(err);
  }
}

// কার্ড দেখানো
function showTests(data) {

  if (data.length === 0) {
    testList.innerHTML = "<p>কোন টেস্ট পাওয়া যায়নি।</p>";
    return;
  }

  testList.innerHTML = "";

  data.forEach(test => {

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

      </div>
    `;

  });

}

// সার্চ
searchInput.addEventListener("input", () => {

  const value = searchInput.value.toLowerCase();

  const filtered = tests.filter(test =>
  test.name.toLowerCase().includes(value) ||
  test.category.toLowerCase().includes(value)
);

  showTests(filtered);

});

// শুরু
loadTests();
