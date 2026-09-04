import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcD7gAuGPcEFdVokOg15DgWBGazwNkvIw",
  authDomain: "lexarena-af45f.firebaseapp.com",
  databaseURL: "https://lexarena-af45f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lexarena-af45f",
  storageBucket: "lexarena-af45f.firebasestorage.app",
  messagingSenderId: "351577232041",
  appId: "1:351577232041:web:cd3c719c80dc22ca77cfb8"
};

const app = initializeApp(firebaseConfig);
window.db = getDatabase(app);

console.log("🔥 Firebase inicializovaný");
