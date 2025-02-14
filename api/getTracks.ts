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

const getAllReleases = async (): Promise<TrackType[]> => {
  const snapshot = await getDocs(collection(db, "releases"));
  const arr = snapshot.docs.map(
    (doc) => ({ ...doc.data(), trackId: doc.id } as TrackType)
  );
  return arr;
};

const getAllArtists = async (): Promise<TrackType[]> => {
  const snapshot = await getDocs(collection(db, "users"));
  const arr = snapshot.docs.map((doc) => ({ ...doc.data() } as TrackType));
  return arr;
};

const getAllArtistsWhere = async (): Promise<TrackType[]> => {
  const artistsCollection = collection(db, "users");
  const q = query(artistsCollection, where("featured", "==", true));
  const snapshot = await getDocs(q);
  const arr = snapshot.docs.map((doc) => ({ ...doc.data() } as TrackType));
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
  input: string | boolean,
  uid?: string
): Promise<TrackType[]> => {
  if (input === "recent" || input === undefined) {
    return getAllTracks();
  }
  let q;
  if (uid) {
    q = query(
      collection(db, "tracks"),
      where(type, "==", input),
      where("uid", "==", uid)
    );
  } else {
    q = query(collection(db, "tracks"), where(type, "==", input));
  }
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map((doc) => {
    const { timestamp, ...dataWithoutTimestamp } = doc.data() as Record<
      string,
      unknown
    >;
    return {
      ...dataWithoutTimestamp,
      trackId: doc.id,
    } as TrackType;
  });

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

const getArtistReleases = async (input: string): Promise<TrackType[]> => {
  const q = query(
    collection(db, "releases"),
    where("uid", "==", input),
    orderBy("timestamp", "desc") // Order by timestamp in descending order
  );
  const querySnapshot = await getDocs(q);
  const arr = querySnapshot.docs.map((doc) => {
    const obj = doc.data();
    return obj as TrackType;
  });
  return arr;
};

const getTracksInRelease = async (trackIds: string[]): Promise<TrackType[]> => {
  if (!trackIds || trackIds.length === 0) {
    return [];
  }

  const q = query(collection(db, "tracks"), where("trackId", "in", trackIds));

  const querySnapshot = await getDocs(q);

  const tracks = querySnapshot.docs.map((doc) => {
    const trackData = doc.data();
    delete trackData.timestamp;
    return trackData as TrackType;
  });

  return tracks;
};

export {
  getAllTracks,
  getArtistTracks,
  getTracksWhere,
  getAllLikedTracks,
  getAllTracksOrdered,
  getAllArtists,
  getAllArtistsWhere,
  getTracksInRelease,
  getArtistReleases,
  getAllReleases,
};
