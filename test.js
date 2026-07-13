import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  where
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
const purpose = document.getElementById("purpose");
const normalRange = document.getElementById("normalRange");
const note = document.getElementById("note");
const diagnosticPrices = document.getElementById("diagnosticPrices");

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
        purpose.textContent = test.purpose || "তথ্য নেই";
        normalRange.textContent = test.normalRange || "তথ্য নেই";
        note.textContent = test.note || "তথ্য নেই";
        loadDiagnosticPrices(test.slug);
      }

    });

    if (!found) {

      name.textContent = "❌ টেস্ট পাওয়া যায়নি";
      category.textContent = "-";
      price.textContent = "-";
      description.textContent = "এই টেস্টটি ডাটাবেজে নেই।";
      sample.textContent = "-";
      preparation.textContent = "-";
      reportTime.textContent = "-";
      purpose.textContent = "-";
      normalRange.textContent = "-";
      note.textContent = "-";

    }

  } catch (error) {

    console.error(error);

    name.textContent = "ত্রুটি";
    description.textContent = "ডাটা লোড করা যায়নি।";

  }

}
async function loadDiagnosticPrices(testSlug) {

  try {

    const q = query(
      collection(db, "diagnostic_prices"),
      where("testSlug", "==", testSlug)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      diagnosticPrices.innerHTML = "<p>এই টেস্টের কোনো মূল্য যোগ করা হয়নি।</p>";
      return;
    }

    diagnosticPrices.innerHTML = "";

    snapshot.forEach((doc) => {

      const data = doc.data();

      diagnosticPrices.innerHTML += `
        <div class="card">
          <strong>🏥 ${data.center}</strong><br>
          📍 ${data.city}<br>
          <span class="price">৳${data.price}</span>
        </div>
      `;

    });

  } catch (error) {

    console.error(error);

    diagnosticPrices.innerHTML = "<p>মূল্য লোড করা যায়নি।</p>";

  }

}
loadTest();
