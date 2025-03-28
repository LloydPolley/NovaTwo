import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
  artwork,
  id,
}: {
  artwork: string;
  id: string;
}) => {
  const response = await fetch(`/api/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artwork, id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update photo");
  }

  return response.json();
};

const registerUser = async ({ email, password, artistName }) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addNeonUser({
      email,
      artist: artistName,
      uid: createdUser?.user?.uid,
    });
  } catch (e) {
    return { ...e };
  }
};

const updateUserDoc = async (uid, { displayName, artwork }) => {
  try {
    await addNeonDisplayPhoto({
      id: uid,
      artwork,
    });
  } catch (e) {
    return { ...e };
  }
};

export { registerUser, updateUserDoc };
