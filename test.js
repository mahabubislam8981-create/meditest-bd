import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// URL থেকে slug নেওয়া
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

// HTML Elements
const name = document.getElementById("name");
const category = document.getElementById("category");
const price = document.getElementById("price");
const description = document.getElementById("description");
const sample = document.getElementById("sample");
const preparation = document.getElementById("preparation");
const reportTime = document.getElementById("reportTime");
document.getElementById("purpose").textContent =
test.purpose || "তথ্য নেই";

document.getElementById("normalRange").textContent =
test.normalRange || "তথ্য নেই";

document.getElementById("note").textContent =
test.note || "তথ্য নেই";

async function loadTest() {

  try {

    const snapshot = await getDocs(collection(db, "tests"));

    let found = false;

    snapshot.forEach((doc) => {

      const test = doc.data();

      if (test.slug === slug) {

        found = true;

        name.textContent = test.name || "তথ্য নেই";
        category.textContent = test.category || "তথ্য নেই";
        price.textContent = test.price || "তথ্য নেই";
        description.textContent = test.description || "তথ্য নেই";
        sample.textContent = test.sample || "তথ্য নেই";
        preparation.textContent = test.preparation || "তথ্য নেই";
        reportTime.textContent = test.reportTime || "তথ্য নেই";

      }

    });

    if (!found) {
      name.textContent = "❌ টেস্ট পাওয়া যায়নি";
      description.textContent = "এই টেস্টটি ডাটাবেজে নেই।";
    }

  } catch (error) {

    console.error(error);

    name.textContent = "ত্রুটি";
    description.textContent = "ডাটা লোড করা যায়নি।";

  }

}

loadTest();
