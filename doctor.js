import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const doctorList = document.getElementById("doctorList");

async function testConnection() {

  try {

    const snapshot = await getDocs(collection(db, "doctor_guide"));

    doctorList.innerHTML = `
      <div class="card">
        <h2>Firestore Connected ✅</h2>
        <p>Documents: ${snapshot.size}</p>
      </div>
    `;

    snapshot.forEach(doc => {

      doctorList.innerHTML += `
        <div class="card">
          <h3>${doc.id}</h3>
          <pre>${JSON.stringify(doc.data(), null, 2)}</pre>
        </div>
      `;

    });

  } catch (err) {

    doctorList.innerHTML = `
      <div class="card">
        <h2>❌ Firestore Error</h2>
        <pre>${err.message}</pre>
      </div>
    `;

    console.error(err);

  }

}

testConnection();
