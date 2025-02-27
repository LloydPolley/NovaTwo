"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { addRelease, uploadFile, fetchFile } from "../../api/addTracks";
import { redirect, RedirectType } from "next/navigation";
import useAuthStore from "../../context/AuthStore";

const defaultValues = {
  title: "",
  album: "",
  label: "",
  mix: "release",
  artworkFile: "",
  audioFile: "",
};

function CreateReleaseForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  const { userData } = useAuthStore((state) => state);

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (complete) {
      const params = new URLSearchParams(searchParams);
      params.set("s", "3");
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [complete, router, searchParams]);

  const onSubmit = async (data) => {
    const { title, artworkFile } = data;
    const { displayName, uid } = userData;

    // Modify the file name to remove spaces
    const modifiedFileName = artworkFile[0].name.replace(/\s+/g, "_");

    // Construct the artwork URL with the modified file name
    const artworkUrl = `gs://nova-2-1c493.appspot.com/${displayName}/releases/${title}/artwork/${modifiedFileName}`;

    let artwork;

    setLoading(true);

    if (artworkFile) {
      // Create a new File object with the modified file name
      const modifiedFile = new File([artworkFile[0]], modifiedFileName, {
        type: artworkFile[0].type,
      });

      await uploadFile({
        title: title,
        artist: displayName,
        file: modifiedFile,
        type: "artwork",
      });
      artwork = await fetchFile(artworkUrl);
    }

    const neonReleaseId = await addRelease({
      title,
      artist: displayName,
      artwork,
      uid,
    });

    console.log("neonReleaseId", neonReleaseId);

    setUrl(`done`);
    setLoading(false);
    setComplete(true);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="track-name">Release</label>
      <input
        id="track-name"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder={"Release name"}
        {...register("title")}
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
  );
}

export default CreateReleaseForm;
