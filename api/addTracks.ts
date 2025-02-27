import { storage } from "../utils/firebase";
import { v4 } from "uuid";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";

const addRelease = async ({
  title,
  uid,
  artwork,
  artist,
}: {
  title: string;
  uid: string;
  artwork: string;
  artist: string;
}) => {
  const response = await fetch("/api/releases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, uid, artwork, artist, id: v4() }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to add user");

  return data;
};

const addTrack = async ({
  uid,
  title,
  artwork,
  releaseId,
  audio,
  mix,
  artist,
  duration,
}: {
  title: string;
  uid: string;
  artwork: string;
  releaseId: string;
  artist: string;
  audio: string;
  mix: boolean;
  duration: string;
}) => {
  console.log("add neon track");
  const response = await fetch("/api/tracks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      uid,
      artwork,
      artist,
      releaseId,
      audio,
      id: v4(),
      mix,
      duration,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to add track");
  return data;
};

const uploadFile = async ({ type = "audio", artist, file, title }) => {
  try {
    const { name } = file;
    const typePicker = type === "audio" ? "tracks" : "releases";
    console.log("typePicker", typePicker);
    const storageRef = ref(
      storage,
      `${artist}/${typePicker}/${title}/${type}/${name}`
    );

    const snapShot = await uploadBytes(storageRef, file);

    console.log("snapShot", snapShot);
  } catch (e) {
    console.log("e", e);
  }
};

const uploadNAddTrack = async ({
  artist,
  titles,
  index,
  audio,
  artwork,
  uid,
  id,
  mix,
}) => {
  const audioUrl = `gs://nova-2-1c493.appspot.com/${artist}/tracks/${titles[index]}/audio/${audio.file.name}`;

  let audioAccess;

  if (audio) {
    await uploadFile({
      title: titles[index],
      artist,
      file: audio.file,
      type: "audio",
    });

    audioAccess = await fetchFile(audioUrl);
  }

  await addTrack({
    title: titles[index],
    artist,
    audio: audioAccess,
    artwork,
    uid,
    duration: audio.duration,
    releaseId: id,
    mix: mix[index] === "mix" ? true : false,
  });
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

export {
  addTrack,
  addRelease,
  uploadFile,
  fetchFile,
  uploadImg,
  uploadNAddTrack,
};
