import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, updateDoc, setDoc } from "firebase/firestore";

const addNeonUser = async ({
  email,
  displayName,
  uid,
}: {
  email: string;
  displayName: string;
  uid: string;
}) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, displayName, uid }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to add user");

  return data;
};

const registerUser = async ({ email, password, displayName }) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addNeonUser({ email, displayName, uid: createdUser?.user?.uid });
    await setUserDoc({ uid: createdUser?.user?.uid, email, displayName });
  } catch (e) {
    return { ...e };
  }
};

const setUserDoc = async ({ displayName, uid, email }) => {
  try {
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      displayName,
    });
  } catch (e) {
    return { ...e };
  }
};

const updateUserDoc = async (uid, { displayName, profile }) => {
  try {
    updateDoc(doc(db, "users", uid), {
      ...(displayName ? { displayName } : {}),
      ...(profile ? { profile } : {}),
    });
  } catch (e) {
    return { ...e };
  }
};

export { registerUser, updateUserDoc };
