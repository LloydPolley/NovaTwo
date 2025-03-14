import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT)
    ),
  });
}

export const adminDb = getFirestore();
