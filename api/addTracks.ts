import { db, storage } from "../utils/firebase";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";

const addTrack = async ({
  name,
  artist,
  trackName,
  audioFileLocation,
  artworkFileLocation,
  uid,
  mix,
  releaseId,
  duration,
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
      mix,
      trackId,
      releaseId,
      duration,
    });

    const releaseDocRef = doc(db, "releases", releaseId);
    const releaseDocSnap = await getDoc(releaseDocRef);
    if (!releaseDocSnap.exists()) {
      console.error("User document does not exist");
      return { error: "User document does not exist" };
    }

    await updateDoc(releaseDocRef, {
      trackIds: arrayUnion(trackId),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
    return { ...e };
  }
};

const addRelease = async ({
  name,
  artist,
  artworkFileLocation,
  uid,
  releaseId,
}) => {
  try {
    const date = new Date().toLocaleString();

    const docRef = doc(collection(db, "releases"), releaseId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.error("Document with the same custom ID already exists");
      return { error: "Document with the same custom ID already exists" };
    }

    // Set the document as before
    await setDoc(docRef, {
      name,
      artist,
      artworkFileLocation,
      date,
      timestamp: serverTimestamp(),
      uid,
      releaseId,
    });

    const userDocRef = doc(db, "users", uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      console.error("User document does not exist");
      return { error: "User document does not exist" };
    }

    await updateDoc(userDocRef, {
      releases: arrayUnion({ releaseId, artworkFileLocation, name }),
    });

    console.log(
      "Release added successfully and name added to user's releases array"
    );
  } catch (e) {
    console.error("Error adding release: ", e);
    return { ...e };
  }
};

const uploadFile = async ({ type = "audio", artist, file, trackName }) => {
  try {
    const { name } = file;
    const typePicker = type === "audio" ? "tracks" : "releases";
    console.log("typePicker", typePicker);
    const storageRef = ref(
      storage,
      `${artist}/${typePicker}/${trackName}/${type}/${name}`
    );

    const snapShot = await uploadBytes(storageRef, file);

    console.log("snapShot", snapShot);
  } catch (e) {
    console.log("e", e);
  }
};

const uploadImg = async ({ artist, file }) => {
  const { name } = file;
  const storageRef = ref(storage, `${artist}/profile/${name}`);

  const snapShot = await uploadBytes(storageRef, file);
};

const fetchFile = async (itemUrl) => {
  try {
    const storage = await getStorage();
    const url = await getDownloadURL(ref(storage, itemUrl));
    return url;
  } catch (e) {
    return e;
  }
};

export { addTrack, addRelease, uploadFile, fetchFile, uploadImg };
