import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const testList = document.getElementById("testList");
const popularTests = document.getElementById("popularTests");
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");

let tests = [];

// ==========================
// সব টেস্ট লোড
// ==========================
async function loadTests() {

  testList.innerHTML = "<p>লোড হচ্ছে...</p>";

  try {

    const snapshot = await getDocs(collection(db, "tests"));

    tests = snapshot.docs.map(doc => doc.data());

    renderPopularTests();

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

// ==========================
// জনপ্রিয় টেস্ট
// ==========================
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
      style="display:block;margin-bottom:10px;text-decoration:none;text-align:center;">
      🔥 ${test.name}
      </a>
    `;

  });

}

// ==========================
// টেস্ট কার্ড
// ==========================
function renderTests(data) {

  if (data.length === 0) {

    testList.innerHTML =
      "<p>❌ কোনো তথ্য পাওয়া যায়নি।</p>";

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
      ৳${test.price || "-"}
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

// ==========================
// Live Search Suggestions
// ==========================
function showSuggestions(keyword) {

  if (!searchSuggestions) return;

  if (keyword === "") {

    searchSuggestions.style.display = "none";
    searchSuggestions.innerHTML = "";

    return;

  }

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

  }).slice(0,8);

  if (filtered.length === 0) {

    searchSuggestions.style.display = "none";

    searchSuggestions.innerHTML = "";

    return;

  }

  searchSuggestions.innerHTML = "";

  filtered.forEach(test => {

    searchSuggestions.innerHTML += `

    <div class="search-item">

      <a href="test.html?slug=${test.slug}"
      style="text-decoration:none;color:#222;display:block;">

      <strong>${test.name}</strong><br>

      <small>${test.category || ""}</small>

      </a>

    </div>

    `;

  });

  searchSuggestions.style.display = "block";

}

// ==========================
// Search
// ==========================
searchInput.addEventListener("input", () => {

  const keyword = searchInput.value.trim().toLowerCase();

  showSuggestions(keyword);

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

// ==========================
// Suggestions Hide
// ==========================
document.addEventListener("click", (e)=>{

  if(!e.target.closest(".search-box")){

    if(searchSuggestions){

      searchSuggestions.style.display="none";

    }

  }

});

// ==========================

loadTests();
