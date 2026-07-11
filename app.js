import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const testList = document.getElementById("testList");
const searchInput = document.getElementById("searchInput");

let tests = [];

async function loadTests() {
  try {
    const snapshot = await getDocs(collection(db, "tests"));

    tests = [];
    snapshot.forEach((doc) => {
      tests.push(doc.data());
    });

    showTests(tests);

  } catch (e) {
    console.error(e);
    testList.innerHTML = "<p>ডাটা লোড করা যায়নি।</p>";
  }
}

function showTests(data) {
  testList.innerHTML = "";

  if (data.length === 0) {
    testList.innerHTML = "<p>কোনো তথ্য পাওয়া যায়নি।</p>";
    return;
  }

  data.forEach((test) => {
    testList.innerHTML += `
      <div class="card">
        <h2>${test.name || ""}</h2>
        <p><strong>বিভাগ:</strong> ${test.category ? test.category : "তথ্য নেই"}</p>
        <div class="price">৳${test.price || ""}</div>
      </div>
    `;
  });
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = tests.filter((test) => {
    const name = (test.name || "").toLowerCase();
    const category = (test.category || "").toLowerCase();

    return name.includes(keyword) || category.includes(keyword);
  });

  showTests(filtered);
});

loadTests();
