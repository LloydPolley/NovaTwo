"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addTrack, uploadFile, fetchFile } from "../../api/addTracks";
import Form from "./Form/Form";
import useAuthStore from "../../context/AuthStore";

const defaultValues = {
  label: "",
  mix: "release",
  artworkFile: "",
  audioFile: "",
};

function UploadTrackForm({ releaseId, artworkFileLocation, name }) {
  const { register, handleSubmit, reset } = useForm();

  const { userData } = useAuthStore((state) => state);
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const onSubmit = async (data) => {
    const { names, audioFilesForm, mix } = data;
    const { displayName, uid } = userData;

    setLoading(true);

    console.log("submit form", loading);

    await Promise.all(
      audioFiles.map(async (audio, index) => {
        const audioUrl = `gs://nova-2-1c493.appspot.com/${displayName}/tracks/${names[index]}/audio/${audio.file.name}`;

        let audioAccess;

        if (audio) {
          await uploadFile({
            trackName: names[index],
            artist: displayName,
            file: audio.file,
            type: "audio",
          });

          audioAccess = await fetchFile(audioUrl);
        }

        await addTrack({
          name: names[index],
          artist: displayName,
          trackName: audio.file.name,
          audioFileLocation: audioAccess,
          artworkFileLocation,
          releaseId,
          uid,
          duration: audio.duration,
          mix: mix[index] === "mix" ? true : false,
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

  const handleInputChange = (e) => {
    const files = Array.from(e.target.files);
    const filesWithDuration = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const audioElement = new Audio(event.target.result);

        audioElement.onloadedmetadata = () => {
          const duration = formatDuration(audioElement.duration);

          const fileWithDuration = {
            file,
            duration,
          };
          filesWithDuration.push(fileWithDuration);
          if (filesWithDuration.length === files.length) {
            setAudioFiles(filesWithDuration);
          }
        };
      };

      reader.readAsDataURL(file);
    });
  };

  if (userData === null) {
    return null;
  }

  return (
    <Form title={name} loading={loading}>
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
                {...register(`names.${index}`)}
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
        href={`/${userData?.uid}?f=all`}
      >
        Done
      </a>
    </Form>
  );
}

export default UploadTrackForm;
