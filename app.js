import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const testList = document.getElementById("testList");
const searchInput = document.getElementById("searchInput");

let tests = [];

// সব টেস্ট লোড
async function loadTests() {
  testList.innerHTML = "<p>লোড হচ্ছে...</p>";

  try {
    const snapshot = await getDocs(collection(db, "tests"));

    tests = snapshot.docs.map(doc => doc.data());

    const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

if (selectedCategory) {
  const filtered = tests.filter(
    test => test.category === selectedCategory
  );
  renderTests(filtered);
} else {
  renderTests(tests);
}

  } catch (error) {
    console.error(error);
    testList.innerHTML = "<p>ডাটা লোড করা যায়নি।</p>";
  }
}

// টেস্ট কার্ড দেখানো
function renderTests(data) {

  if (data.length === 0) {
    testList.innerHTML = "<p>কোনো তথ্য পাওয়া যায়নি।</p>";
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

        <a href="test.html?slug=${test.slug}">
          <button class="details-btn">
            বিস্তারিত দেখুন
          </button>
        </a>

      </div>
    `;

  });

}

// সার্চ
searchInput.addEventListener("input", () => {

  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = tests.filter(test => {

  const name = (test.name || "").toLowerCase();
  const category = (test.category || "").toLowerCase();
  const keywords = (test.keywords || "").toLowerCase();

  return (
    name.includes(keyword) ||
    category.includes(keyword) ||
    keywords.includes(keyword)
  );

});

  renderTests(filtered);

});

loadTests();
