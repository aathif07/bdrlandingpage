import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCK2W3iwwiJdPmc9Dt4wXuF_MlaAurrah8",
  authDomain: "bigdatarhino-78508.firebaseapp.com",
  projectId: "bigdatarhino-78508",
  storageBucket: "bigdatarhino-78508.firebasestorage.app",
  messagingSenderId: "1019947763221",
  appId: "1:1019947763221:web:39749eb825bb5f65c0f01c",
  measurementId: "G-3VQZCY1793"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the initialized services
export { auth, db, storage };