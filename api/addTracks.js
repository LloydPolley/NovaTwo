import { db, storage } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";

const addTrack = async ({
  name,
  artist,
  trackName,
  audioFileLocation,
  artworkFileLocation,
  label,
  uid,
}) => {
  console.log("audio src", audioSrc);
  try {
    const date = new Date().toLocaleString();
    const docRef = await addDoc(collection(db, "tracks"), {
      name,
      artist,
      trackName,
      audioFileLocation,
      artworkFileLocation,
      date,
      uid,
      label,
    });
  } catch (e) {
    console.log("e", e);
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
