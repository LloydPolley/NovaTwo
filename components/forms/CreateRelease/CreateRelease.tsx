"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addRelease, uploadFile, fetchFile } from "../../../api/addTracks";
import Form from "../Form/Form";
import { redirect, RedirectType } from "next/navigation";
import useAuthStore from "../../../context/AuthStore";

const defaultValues = {
  name: "",
  album: "",
  label: "",
  mix: "release",
  artworkFile: "",
  audioFile: "",
};

function CreateReleaseForm({ setRelease }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { userData } = useAuthStore((state) => state);

  const [image, setImage] = useState("");
  const [releaseName, setReleaseName] = useState("");
  const [artworkReleaseUrl, setArtworkReleaseUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete) {
      console.log("complete");
      setRelease({
        created: true,
        releaseId: `${releaseName}_${userData?.uid}_release`,
        artwork: artworkReleaseUrl,
      });
    }
  }, [complete]);

  const onSubmit = async (data) => {
    const { name, artworkFile } = data;
    const { displayName, uid } = userData;
    setReleaseName(name);

    const artworkUrl = `gs://nova-2-1c493.appspot.com/${displayName}/releases/${name}/artwork/${artworkFile[0].name}`;

    let artworkAccess;

    setLoading(true);

    if (artworkFile) {
      await uploadFile({
        trackName: name,
        artist: displayName,
        file: artworkFile[0],
        type: "artwork",
      });
      artworkAccess = await fetchFile(artworkUrl);
      setArtworkReleaseUrl(artworkAccess);
    }

    await addRelease({
      releaseId: `${name}_${uid}_release`,
      name,
      artist: displayName,
      artworkFileLocation: artworkAccess,
      uid,
    });

    setLoading(false);
    setComplete(true);
  };

  if (userData === null) {
    return null;
  }

  return (
    <Form title={"Create Release"} loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="track-name">Release</label>
        <input
          id="track-name"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder={"Release name"}
          {...register("name")}
          required
        />

        <label htmlFor="label">Artwork</label>
        <label
          htmlFor="artwork-upload"
          className="w-full p-4 border border-dashed border-gray-400 rounded cursor-pointer text-left"
        >
          <p>{image ? image : "Upload artwork image"}</p>
        </label>

        <input
          className="hidden"
          id="artwork-upload"
          type="file"
          accept="image/*"
          required
          {...register("artworkFile")}
          onInput={(e) => {
            const file = (e.target as HTMLInputElement).files[0];
            setImage(file?.name);
          }}
        />

        <input
          type="submit"
          value="Next"
          disabled={loading}
          className="w-full p-2 text-white bg-blue-500 rounded cursor-pointer disabled:opacity-50 mt-3"
        />
      </form>
    </Form>
  );
}

export default CreateReleaseForm;

// https://firebasestorage.googleapis.com/v0/b/novatwo-f3f41.appspot.com/o/Anyma%2Freleases%2FGenesys%20II%2Fartwork%2Fanyma%20gen.jpeg
// https://firebasestorage.googleapis.com/v0/b/nova-2-1c493.appspot.com/o/Anyma%2Freleases%2FGenesys%20II%2Fartwork%2Fanyma%20gen.jpeg
