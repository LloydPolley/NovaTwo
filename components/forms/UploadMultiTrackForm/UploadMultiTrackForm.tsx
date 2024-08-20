"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addTrack, uploadFile, fetchFile } from "../../../api/addTracks";
import Form from "../Form/Form";
import useAuthStore from "../../../context/AuthStore";

const defaultValues = {
  label: "",
  mix: "release",
  artworkFile: "",
  audioFile: "",
};

function UploadTrackForm({ releaseId, artworkUrl }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    // defaultValues,
  });

  const { userData } = useAuthStore((state) => state);

  const [audioFiles, setAudioFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const onSubmit = async (data) => {
    const { names, audioFilesForm, mix } = data;
    const { displayName, uid } = userData;

    console.log("names", names);

    setLoading(true);

    Object.entries(audioFilesForm).map(async ([key, value]) => {
      console.log("keys", value);
      const audioUrl = `gs://nova-2-1c493.appspot.com/${displayName}/tracks/${names[key]}/audio/${value.name}`;

      let audioAccess;

      if (value) {
        await uploadFile({
          trackName: names[key],
          artist: displayName,
          file: value,
          type: "audio",
        });

        audioAccess = await fetchFile(audioUrl);

        console.log("audioAccess", audioAccess);
      }

      await addTrack({
        name: names[key],
        artist: displayName,
        trackName: value.name,
        audioFileLocation: audioAccess,
        artworkFileLocation: artworkUrl,
        releaseId,
        uid,
        mix: mix === "mix" ? true : false,
      });
    });

    setLoading(false);
    setComplete(true);
  };

  useEffect(() => {
    if (complete) {
      reset(defaultValues);
      setComplete(false);
    }
  }, [complete]);

  if (userData === null) {
    return null;
  }

  return (
    <Form title={"Create Release"} loading={loading}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="audio-upload" className="block">
          Audio
        </label>
        <input
          id="audio-upload"
          type="file"
          accept=".mp3,audio/*"
          required
          multiple
          {...register("audioFilesForm")}
          onInput={(e) => {
            const files = (e.target as HTMLInputElement).files;
            setAudioFiles(files);
          }}
        />

        {audioFiles &&
          Object.entries(audioFiles).map(([key, value]) => (
            <div key={key} className="bg-stone-950 rounded-xl p-4">
              <h3>Files - {value?.name}</h3>
              <label htmlFor="track-name">Name</label>
              <input
                id="track-name"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder={"Track name"}
                {...register(`names.${key}`)} // Register names as an array
                required
              />
            </div>
          ))}

        <input
          type="submit"
          value="Upload"
          disabled={loading}
          className="w-full bg-blue-500 text-white rounded py-2 cursor-pointer disabled:bg-blue-300"
        />
      </form>
      <a
        className="block text-center text-blue-500 mt-4"
        href={`/${userData?.uid}?f=all`}
      >
        Done
      </a>
    </Form>
  );
}

export default UploadTrackForm;
