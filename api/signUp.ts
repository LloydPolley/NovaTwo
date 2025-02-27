import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, updateDoc, setDoc } from "firebase/firestore";

const addNeonUser = async ({
  email,
  artist,
  uid,
}: {
  email: string;
  artist: string;
  uid: string;
}) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, artist, uid }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to add user");

  return data;
};

const addNeonDisplayPhoto = async ({
  profile,
  id,
}: {
  profile: string;
  id: string;
}) => {
  console.log("profile", profile);
  const response = await fetch(`/api/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile, id }),
  });

  console.log("neon display");

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update photo");
  }

  return response.json();
};

const registerUser = async ({ email, password, artist }) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addNeonUser({ email, artist, uid: createdUser?.user?.uid });
    await setUserDoc({
      uid: createdUser?.user?.uid,
      email,
      displayName: artist,
    });
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
    await updateDoc(doc(db, "users", uid), {
      ...(displayName ? { displayName } : {}),
      ...(profile ? { profile } : {}),
    });

    await addNeonDisplayPhoto({
      id: uid,
      profile,
    });
  } catch (e) {
    return { ...e };
  }
};

export { registerUser, updateUserDoc };
