import { db, storage } from "../utils/firebase";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";

const addTrack = async ({
  name,
  artist,
  trackName,
  audioFileLocation,
  artworkFileLocation,
  label,
  uid,
  mix,
}) => {
  try {
    const date = new Date().toLocaleString();

    const trackId = `${name}_${uid}`;
    const docRef = doc(collection(db, "tracks"), trackId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.error("Document with the same custom ID already exists");
      return { error: "Document with the same custom ID already exists" };
    }

    // Document doesn't exist, add the new document
    await setDoc(docRef, {
      name,
      artist,
      trackName,
      audioFileLocation,
      artworkFileLocation,
      date,
      timestamp: serverTimestamp(),
      uid,
      label,
      mix,
      trackId,
    });

    // console.log("Document added with custom ID: ", customId);
  } catch (e) {
    console.error("Error adding document: ", e);
    return { ...e };
  }
};

const uploadFile = async ({ type = "audio", artist, file, trackName }) => {
  const { name } = file;
  const storageRef = ref(
    storage,
    `${artist}/tracks/${trackName}/${type}/${name}`
  );

  const snapShot = await uploadBytes(storageRef, file);
};

const uploadImg = async ({ artist, file }) => {
  const { name } = file;
  const storageRef = ref(storage, `${artist}/profile/${name}`);

  const snapShot = await uploadBytes(storageRef, file);
};

const fetchFile = async (audioUrl) => {
  try {
    console.log("passed in ", audioUrl);
    const storage = await getStorage();
    const url = await getDownloadURL(ref(storage, audioUrl));
    return url;
  } catch (e) {
    console.log("fetch audio error", e);
  }
};

export { addTrack, uploadFile, fetchFile, uploadImg };
