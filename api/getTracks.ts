import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { TrackType } from "../types/tracks"; // Replace with the appropriate type definition for your Track

const getAllTracks = async (): Promise<TrackType[]> => {
  const snapshot = await getDocs(collection(db, "tracks"));
  const arr = snapshot.docs.map(
    (doc) => ({ ...doc.data(), trackId: doc.id } as TrackType)
  );
  return arr;
};

const getAllTracksOrdered = async (ascending: string): Promise<TrackType[]> => {
  const orderDirection = ascending === "asc" ? "asc" : "desc";

  const q = query(
    collection(db, "tracks"),
    orderBy("timestamp", orderDirection)
  );

  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map((doc) => {
    const obj = doc.data();
    delete obj.timestamp;
    return obj as TrackType;
  });
  return arr;
};

const getAllLikedTracks = async (uid: string): Promise<TrackType[]> => {
  const q = query(
    collection(db, "likes")
    // where("currentUser", "==", uid),
    // orderBy("timestamp", "asc")
  );
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map((doc) => doc.data() as TrackType);
  return arr;
};

const getTracksWhere = async (
  type: string,
  input: string | boolean
): Promise<TrackType[]> => {
  if (input === "recent" || input === undefined) {
    return getAllTracks();
  }
  const q = query(collection(db, "tracks"), where(type, "==", input));
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        trackId: doc.id,
      } as TrackType)
  );
  return arr;
};

const getArtistTracks = async (input: string): Promise<TrackType[]> => {
  const q = query(collection(db, "tracks"), where("uid", "==", input));
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map((doc) => {
    const obj = doc.data();
    delete obj.timestamp;
    return obj as TrackType;
  });
  return arr;
};

export {
  getAllTracks,
  getArtistTracks,
  getTracksWhere,
  getAllLikedTracks,
  getAllTracksOrdered,
};
