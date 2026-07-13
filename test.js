import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// URL থেকে slug
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

// Elements
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
const relatedTests = document.getElementById("relatedTests");

async function loadTest() {
  try {
    const snapshot = await getDocs(collection(db, "tests"));

    let testData = null;

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (data.slug === slug) {
        testData = data;
      }
    });

    if (!testData) {
      name.textContent = "❌ টেস্ট পাওয়া যায়নি";
      return;
    }

    name.textContent = testData.name || "তথ্য নেই";
    category.textContent = testData.category || "তথ্য নেই";
    price.textContent = testData.price || "-";
    description.textContent = testData.description || "তথ্য নেই";
    sample.textContent = testData.sample || "তথ্য নেই";
    preparation.textContent = testData.preparation || "তথ্য নেই";
    reportTime.textContent = testData.reportTime || "তথ্য নেই";
    purpose.textContent = testData.purpose || "তথ্য নেই";
    normalRange.textContent = testData.normalRange || "তথ্য নেই";
    note.textContent = testData.note || "তথ্য নেই";

    await loadDiagnosticPrices(testData.slug);
    await loadRelatedTests(testData.relatedTests || []);

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
      diagnosticPrices.innerHTML =
        "<p>এই টেস্টের কোনো মূল্য যোগ করা হয়নি।</p>";
      return;
    }

    diagnosticPrices.innerHTML = "";

    snapshot.forEach((doc) => {

      const data = doc.data();

      diagnosticPrices.innerHTML += `
      <div class="card">
        <h4>🏥 ${data.center}</h4>
        <p>📍 ${data.city || ""}</p>
        <div class="price">৳${data.price}</div>
      </div>
      `;

    });

  } catch (error) {

    console.error(error);

    diagnosticPrices.innerHTML =
      "<p>মূল্য লোড করা যায়নি।</p>";

  }

}

async function loadRelatedTests(slugs) {

  if (!slugs || slugs.length === 0) {
    relatedTests.innerHTML =
      "<p>কোনো সম্পর্কিত টেস্ট নেই।</p>";
    return;
  }

  try {

    const snapshot = await getDocs(collection(db, "tests"));

    relatedTests.innerHTML = "";

    let found = false;

    snapshot.forEach((doc) => {

      const test = doc.data();

      if (slugs.includes(test.slug)) {

        found = true;

        relatedTests.innerHTML += `
        <div class="card">
          <a href="test.html?slug=${test.slug}">
            🔗 <strong>${test.name}</strong>
          </a>
        </div>
        `;

      }

    });

    if (!found) {
      relatedTests.innerHTML =
        "<p>কোনো সম্পর্কিত টেস্ট পাওয়া যায়নি।</p>";
    }

  } catch (error) {

    console.error(error);

    relatedTests.innerHTML =
      "<p>Related Test লোড করা যায়নি।</p>";

  }

}

loadTest();
