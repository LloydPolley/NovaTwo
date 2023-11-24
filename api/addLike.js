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
  collectionGroup,
} from "firebase/firestore";

const deleteLikeTracksCollection = async ({ trackId, track, currentUser }) => {
  try {
    await deleteDoc(doc(db, "likes", `${currentUser}-${trackId}`));
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

const addLikeToCollection = async ({ trackId, track, currentUser }) => {
  try {
    const date = new Date().toLocaleString();
    await setDoc(doc(db, "likes", `${currentUser}-${trackId}`), {
      date,
      ...track,
      currentUser,
    });
  } catch (e) {
    console.log("caught", e);
    return false;
  }
};

const getUserLikesCollection = async ({}) => {
  const docRef = doc(db, "tracks", trackId, "likes", currentUser);
  const docSnap = await getDoc(docRef);
  // console.log("docsnap", docSnap.data());
  return docSnap.exists() ? true : false;
};

// const addLikeToTracks = async ({ uid, trackId, track, currentUser }) => {
//   const docRef = doc(db, "tracks", trackId);
//   try {
//     await setDoc(doc(docRef, "likes", currentUser), {
//       like: true,
//       currentUser,
//     });
//     await addLikeTracksCollection({ uid, trackId, track, currentUser });
//     return true;
//   } catch (e) {}
// };

// const getUserLikes = async (userId) => {
//   const docRef = doc(db, "likes", userId);
//   const docSnap = await getDoc(docRef);

//   console.log("docsnap", docSnap.data());
//   // return docSnap.exists() ? true : false;
// };

// const getUserLikes = async (userId) => {
//   const likesQuery = query(collectionGroup(db, "likes"));

//   const querySnapshot = await getDocs(likesQuery);

//   const likesData = [];

//   querySnapshot.forEach((doc) => {
//     // Access the data of each document
//     const data = doc.data();

//     // Check if the document ID contains the userId substring
//     if (doc.id.includes(userId)) {
//       // Add the data to the array
//       likesData.push(data);
//     }
//   });

//   console.log("User Likes:", likesData);

//   // You can now return the array or perform other operations as needed
//   // return likesData;
// };

const getUserLikes = async (userId) => {
  const likesRef = collection(db, "likes");

  // Use a query to find all documents where the "currentUser" field is equal to userId
  const querys = query(likesRef, where("currentUser", "==", userId));

  const querySnapshot = await getDocs(querys);

  const likesData = [];

  querySnapshot.forEach((doc) => {
    // Access the data of each document
    const data = doc.data();

    // Add the data to the array
    likesData.push(data);
  });

  console.log("User Likes:", likesData);

  // You can now return the array or perform other operations as needed
  // return likesData;
};

const isLikedByUser = async ({ currentUser, trackId }) => {
  const docRef = doc(db, "tracks", trackId, "likes", currentUser);
  const docSnap = await getDoc(docRef);
  // console.log("docsnap", docSnap.data());
  return docSnap.exists() ? true : false;
};

export {
  addLikeToCollection,
  deleteLikeFromTracks,
  isLikedByUser,
  getUserLikes,
};
