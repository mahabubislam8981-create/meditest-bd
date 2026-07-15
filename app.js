import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const testList = document.getElementById("testList");
const popularTests = document.getElementById("popularTests");
const searchInput = document.getElementById("searchInput");

let tests = [];

// ==============================
// সব টেস্ট লোড
// ==============================
async function loadTests() {

  testList.innerHTML = "<p>লোড হচ্ছে...</p>";

  try {

    const snapshot = await getDocs(collection(db, "tests"));

    tests = snapshot.docs.map(doc => doc.data());

    // জনপ্রিয় টেস্ট দেখাও
    renderPopularTests();

    // Category Filter
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

// ==============================
// জনপ্রিয় টেস্ট
// ==============================
function renderPopularTests() {

  if (!popularTests) return;

  const popular = tests.filter(test => test.popular === true);

  if (popular.length === 0) {

    popularTests.innerHTML =
      "<p>কোনো জনপ্রিয় টেস্ট নেই।</p>";

    return;

  }

  popularTests.innerHTML = "";

  popular.forEach(test => {

    popularTests.innerHTML += `
      <a href="test.html?slug=${test.slug}"
         class="details-btn"
         style="display:block;margin-bottom:10px;text-align:center;text-decoration:none;">
         🔥 ${test.name}
      </a>
    `;

  });

}

// ==============================
// সব টেস্ট কার্ড
// ==============================
function renderTests(data) {

  if (data.length === 0) {

    testList.innerHTML =
      "<p>কোনো তথ্য পাওয়া যায়নি।</p>";

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
          ৳${test.price || ""}
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

// ==============================
// সার্চ
// ==============================
searchInput.addEventListener("input", () => {

  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = tests.filter(test => {

    const name = (test.name || "").toLowerCase();
    const category = (test.category || "").toLowerCase();
    const keywords = (test.keywords || "").toLowerCase();
    const description = (test.description || "").toLowerCase();
    const purpose = (test.purpose || "").toLowerCase();

    return (
      name.includes(keyword) ||
      category.includes(keyword) ||
      keywords.includes(keyword) ||
      description.includes(keyword) ||
      purpose.includes(keyword)
    );

  });

  renderTests(filtered);

});

// ==============================

loadTests();
