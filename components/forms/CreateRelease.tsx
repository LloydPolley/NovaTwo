"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addRelease, uploadFile, fetchFile } from "../../api/addTracks";
import Form from "./Form/Form";
import { redirect, RedirectType } from "next/navigation";
import useAuthStore from "../../context/AuthStore";
import Input from "./Input";

const defaultValues = {
  name: "",
  album: "",
  label: "",
  mix: "release",
  artworkFile: "",
  audioFile: "",
};

function CreateReleaseForm() {
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
  const [url, setUrl] = useState(null);
  const [newUrl, setNewUrl] = useState(null);

  useEffect(() => {
    if (url) {
      redirect(url, RedirectType.push);
    }
  }, [url]);

  const onSubmit = async (data) => {
    const { name, artworkFile } = data;
    const { displayName, uid } = userData;
    setReleaseName(name);

    // Modify the file name to remove spaces
    const modifiedFileName = artworkFile[0].name.replace(/\s+/g, "_");

    // Construct the artwork URL with the modified file name
    const artworkUrl = `gs://nova-2-1c493.appspot.com/${displayName}/releases/${name}/artwork/${modifiedFileName}`;

    let artworkAccess;

    setLoading(true);

    if (artworkFile) {
      // Create a new File object with the modified file name
      const modifiedFile = new File([artworkFile[0]], modifiedFileName, {
        type: artworkFile[0].type,
      });

      await uploadFile({
        trackName: name,
        artist: displayName,
        file: modifiedFile,
        type: "artwork",
      });
      artworkAccess = await fetchFile(artworkUrl);
      setArtworkReleaseUrl(artworkAccess);
    }

    const releaseId = `${name}_${uid}_release`;

    await addRelease({
      releaseId,
      name,
      artist: displayName,
      artworkFileLocation: artworkAccess,
      uid,
    });

    const generatedLink = `/release/upload?releaseId=${releaseId}&name=${name}&artworkUrl=${artworkAccess}`;

    localStorage.setItem(
      "release",
      JSON.stringify({ name, releaseId, artworkFileLocation: artworkAccess })
    );

    setUrl("/release/upload");
    setLoading(false);
    setComplete(true);
  };

  if (userData === null) {
    return null;
  }

  return (
    <Form title={"Create Release"} loading={loading}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          className="submit w-full p-2 text-white bg-blue-500 rounded cursor-pointer disabled:opacity-50 mt-3"
        />
      </form>
    </Form>
  );
}

export default CreateReleaseForm;

// https://firebasestorage.googleapis.com/v0/b/novatwo-f3f41.appspot.com/o/Anyma%2Freleases%2FGenesys%20II%2Fartwork%2Fanyma%20gen.jpeg
// https://firebasestorage.googleapis.com/v0/b/nova-2-1c493.appspot.com/o/Anyma%2Freleases%2FGenesys%20II%2Fartwork%2Fanyma%20gen.jpeg
