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
  apiKey: "AIzaSyCuFp4gwssSmq3fjqNKTKuaTsjLs6DDx-k",
  authDomain: "novatwo-f3f41.firebaseapp.com",
  projectId: "novatwo-f3f41",
  storageBucket: "novatwo-f3f41.appspot.com",
  messagingSenderId: "251081613120",
  appId: "1:251081613120:web:bbe1cff6fe81b5274b24a5",
  measurementId: "G-0K9EJZZ9N9",
};

// console.log(firebase);

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

console.log("db", db);

export { auth, db, storage };
