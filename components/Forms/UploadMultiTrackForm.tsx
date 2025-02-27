"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addTrack, uploadFile, fetchFile } from "../../api/addTracks";
import Form from "./Form/Form";
import useAuthStore from "../../context/AuthStore";
import { uploadNAddTrack } from "../../api/addTracks";

const defaultValues = {
  label: "",
  mix: "release",
  artworkFile: "",
  audioFile: "",
};

function UploadMultiTrackForm({ release }) {
  const { id, artwork, artist, uid } = release;

  const { register, handleSubmit, reset } = useForm();

  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const onSubmit = async (data) => {
    const { titles, mix } = data;
    setLoading(true);

    await Promise.all(
      audioFiles.map(async (audio, index) => {
        await uploadNAddTrack({
          artist,
          titles,
          index,
          audio,
          artwork,
          uid,
          id,
          mix,
        });
      })
    );

    setComplete(true);
  };

  useEffect(() => {
    if (complete) {
      setLoading(false);
      reset(defaultValues);
      setComplete(false);
      setAudioFiles([]);
    }
  }, [complete]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const filesWithDuration: { file: File; duration: string }[] = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          const audioElement = new Audio(result);
          audioElement.onloadedmetadata = () => {
            const duration = formatDuration(audioElement.duration);

            filesWithDuration.push({ file, duration });

            if (filesWithDuration.length === files.length) {
              setAudioFiles(filesWithDuration);
            }
          };
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="audio-upload" className="block">
          Audio
        </label>
        <input
          id="audio-upload"
          type="file"
          accept=".mp3,audio/*"
          required
          multiple
          onInput={handleInputChange}
        />

        {audioFiles &&
          audioFiles.map((audio, index) => (
            <div key={index} className="bg-stone-950 rounded-xl p-4">
              <h3>Files - {audio.file?.name}</h3>
              <label htmlFor="track-name">Name</label>
              <input
                id="track-name"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder={"Track name"}
                {...register(`titles.${index}`)}
                required
              />
              <input
                type="radio"
                id="mix"
                name="release-type"
                value="mix"
                {...register(`mix.${index}`)}
              />
              <label htmlFor="mix">Mix</label>
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
        href={`/${uid}?f=all`}
      >
        Done
      </a>
    </>
  );
}

export default UploadMultiTrackForm;
