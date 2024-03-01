import { db } from "../utils/firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const deleteLikeTracksCollection = async ({ track, currentUser }) => {
  try {
    await deleteDoc(doc(db, "likes", `${track.trackId}-${currentUser}`));
  } catch (e) {
    console.log("caught", e);
    return false;
  }
};

const deleteLikeFromTracks = async ({ uid, trackId, currentUser }) => {
  const docRef = doc(db, "tracks", trackId);
  await deleteDoc(doc(docRef, "likes", currentUser));
  await deleteLikeTracksCollection({ uid, trackId, currentUser });
  return false;
};

const addLikeToCollection = async ({ track, currentUser }) => {
  try {
    const date = new Date().toLocaleString();
    await setDoc(doc(db, "likes", `${track.trackId}-${currentUser}`), {
      date,
      ...track,
      currentUser,
    });
  } catch (e) {
    console.log("caught", e);
    return false;
  }
};

// const getArtistLikesCollection = async ({ artistId }) => {
//   const docRef = doc(db, "likes", trackId, artistId);
//   const docSnap = await getDoc(docRef);
//   // console.log("docsnap", docSnap.data());
//   return docSnap.exists() ? true : false;
// };

const getArtistLikesCollection = async (artistId) => {
  const q = query(
    collection(db, "tracks"),
    where("currentUser", "==", artistId)
  );
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    trackId: doc.id,
  }));
  return arr;
};

const getUserLikes = async (userId) => {
  const likesRef = collection(db, "likes");
  const querys = query(likesRef, where("currentUser", "==", userId));
  const querySnapshot = await getDocs(querys);

  const likesData = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    likesData.push(data);
  });

  return likesData;
};

const isLikedByUser = async ({ currentUser, trackId }) => {
  const docRef = doc(db, "tracks", trackId, "likes", currentUser);
  const docSnap = await getDoc(docRef);
  // console.log("docsnap", docSnap.data());
  return docSnap.exists() ? true : false;
};

const addTrack = async ({ uid }) => {
  try {
    const date = new Date().toLocaleString();

    const trackId = `${name}_${uid}`;
    const docRef = doc(collection(db, "tracks"), trackId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.error("Document with the same custom ID already exists");
      return { error: "Document with the same custom ID already exists" };
    }

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
  } catch (e) {
    console.error("Error adding document: ", e);
    return { ...e };
  }
};

export {
  addLikeToCollection,
  deleteLikeFromTracks,
  isLikedByUser,
  getUserLikes,
  deleteLikeTracksCollection,
};
