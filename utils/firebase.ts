import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAfBYr2qkjV0n9l2LI3E45_8B5YlMK2H00",
  authDomain: "nova-2-1c493.firebaseapp.com",
  projectId: "nova-2-1c493",
  storageBucket: "nova-2-1c493.appspot.com",
  messagingSenderId: "40887506510",
  appId: "1:40887506510:web:6b17615b673a3256c5d51f",
  measurementId: "G-ZRPM6QKELK",
};

const { getApp, initializeApp } = firebase;

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const app = createFirebaseApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { auth, db, storage };
