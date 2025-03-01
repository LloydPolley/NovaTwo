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
  profile,
  id,
}: {
  profile: string;
  id: string;
}) => {
  const response = await fetch(`/api/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile, id }),
  });

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
  } catch (e) {
    return { ...e };
  }
};

const updateUserDoc = async (uid, { displayName, profile }) => {
  try {
    await addNeonDisplayPhoto({
      id: uid,
      profile,
    });
  } catch (e) {
    return { ...e };
  }
};

export { registerUser, updateUserDoc };
