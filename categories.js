import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const categoryList = document.getElementById("categoryList");

async function loadCategories() {
  categoryList.innerHTML = "<p>লোড হচ্ছে...</p>";

  try {
    const snapshot = await getDocs(collection(db, "categories"));

    if (snapshot.empty) {
      categoryList.innerHTML = "<p>কোনো ক্যাটাগরি পাওয়া যায়নি।</p>";
      return;
    }

    categoryList.innerHTML = "";

    snapshot.forEach((doc) => {
      const category = doc.data();

      categoryList.innerHTML += `
        <div class="card">
          <h2>${category.icon || "📂"} ${category.name}</h2>

          <p>${category.description || ""}</p>

          <a href="index.html?category=${encodeURIComponent(category.name)}">
            <button class="details-btn">
              এই ক্যাটাগরির টেস্ট দেখুন
            </button>
          </a>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    categoryList.innerHTML = "<p>ক্যাটাগরি লোড করা যায়নি।</p>";
  }
}

loadCategories();
