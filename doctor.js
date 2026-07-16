console.log("Doctor JS Version: 1.0");
console.log("Time:", new Date().toISOString());
import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const doctorList = document.getElementById("doctorList");

async function testConnection() {

  try {

    console.log("Project ID:", db.app.options.projectId);

    const snapshot = await getDocs(collection(db, "doctor_guide"));

snapshot.forEach(doc => {
  console.log(doc.id);
  console.log(doc.data());
});

alert("doctor_guide = " + snapshot.size);
    
    snapshot.forEach(doc => {
      console.log(doc.id, doc.data());
    });

    doctorList.innerHTML = `
      <div class="card">
        <h2>Project: ${db.app.options.projectId}</h2>
        <h3>Documents: ${snapshot.size}</h3>
      </div>
    `;

  } catch (err) {

    doctorList.innerHTML = `
      <div class="card">
        <h2>❌ ${err.message}</h2>
      </div>
    `;

    console.error(err);

  }

}

testConnection();
const snapshot = await getDocs(collection(db, "doctor_guide"));

console.log("Size:", snapshot.size);

snapshot.forEach(doc => {
  console.log(doc.id, doc.data());
});

alert("Documents = " + snapshot.size);
