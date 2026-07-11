import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// URL থেকে টেস্টের নাম নেওয়া
const params = new URLSearchParams(window.location.search);
const testName = params.get("name");

// HTML Elements
const name = document.getElementById("name");
const category = document.getElementById("category");
const price = document.getElementById("price");
const description = document.getElementById("description");
const sample = document.getElementById("sample");
const preparation = document.getElementById("preparation");
const reportTime = document.getElementById("reportTime");

// Firestore থেকে ডাটা আনা
async function loadTest() {
  const snapshot = await getDocs(collection(db, "tests"));

  snapshot.forEach((doc) => {

    const test = doc.data();

    if (test.name === testName) {

      name.textContent = test.name;
      category.textContent = test.category || "তথ্য নেই";
      price.textContent = test.price || "";
      description.textContent = test.description || "তথ্য নেই";
      sample.textContent = test.sample || "তথ্য নেই";
      preparation.textContent = test.preparation || "তথ্য নেই";
      reportTime.textContent = test.reportTime || "তথ্য নেই";

    }

  });
}

loadTest();
