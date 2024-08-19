"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addTrack, uploadFile, fetchFile } from "../../../api/addTracks";
import classNames from "classnames/bind";
import styles from "./UploadTrackForm.module.scss";
import Form from "../Form/Form";
import useAuthStore from "../../../context/AuthStore";

const cx = classNames.bind(styles);

const defaultValues = {
  name: "",
  releaseId: "",
  label: "",
  mix: "release",
  artworkFile: "",
  audioFile: "",
};

function UploadTrackForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { userData } = useAuthStore((state) => state);

  const [releaseIndex, setReleaseIndex] = useState(0);
  const [audio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const onSubmit = async (data) => {
    const { name, audioFile, label, mix, releaseId } = data;
    const { displayName, uid } = userData;

    const audioUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/tracks/${name}/audio/${audioFile[0].name}`;

    let audioAccess;

    setLoading(true);

    if (audioFile) {
      await uploadFile({
        trackName: name,
        artist: displayName,
        file: audioFile[0],
        type: "audio",
      });

      audioAccess = await fetchFile(audioUrl);
    }

    await addTrack({
      name,
      artist: displayName,
      trackName: audioFile[0].name,
      audioFileLocation: audioAccess,
      artworkFileLocation: userData.releases[releaseIndex].artworkFileLocation,
      label,
      releaseId,
      uid,
      mix: mix === "mix" ? true : false,
    });

    setLoading(false);
    setComplete(true);
  };

  useEffect(() => {
    if (complete) {
      reset(defaultValues);
    }
  }, [complete]);

  const handleReleaseChange = (event) => {
    setReleaseIndex(event.target.selectedIndex - 1);
  };

  if (userData === null) {
    return null;
  }

  return (
    <Form title={"Upload"} loading={loading}>
      <form className={cx("upload-form")} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="track-name">Name</label>
        <input
          id="track-name"
          placeholder={"Track name"}
          {...register("name")}
          required
        />

        <label htmlFor="label">Label</label>
        <input id="label" placeholder="Track label" {...register("label")} />

        <label htmlFor="releaseId">Release</label>
        <select
          id="releaseId"
          {...register("releaseId")}
          required
          onChange={handleReleaseChange}
        >
          <option value="">Select a Release</option>
          {userData?.releases?.map((release, index) => {
            const { name, releaseId } = release;
            return (
              <option key={index} value={releaseId}>
                {name}
              </option>
            );
          })}
        </select>

        <label htmlFor="label">Audio</label>
        <label htmlFor="audio-upload" className={cx("upload-form__widget")}>
          <p>{audio ? audio : "Upload audio"}</p>
        </label>

        <div className={cx("upload-form__toggle")}>
          <input
            type="radio"
            id="release"
            name="release-type"
            value="release"
            defaultChecked
            {...register("mix")}
          />
          <label htmlFor="release">Release</label>
          <input
            type="radio"
            id="mix"
            name="release-type"
            value="mix"
            {...register("mix")}
          />
          <label htmlFor="mix">Mix</label>
        </div>

        <input
          className={cx("upload-button")}
          id="audio-upload"
          type="file"
          accept=".mp3,audio/*"
          required
          multiple
          {...register("audioFile")}
          onInput={(e) => {
            const file = (e.target as HTMLInputElement).files[0];
            setAudio(file?.name);
          }}
        />

        <input type="submit" value="Upload" disabled={loading} />
      </form>
      <a className="text-center" href={`/${userData?.uid}?f=all`}>
        Done
      </a>
    </Form>
  );
}

export default UploadTrackForm;

// https://firebasestorage.googleapis.com/v0/b/novatwo-f3f41.appspot.com/o/Anyma%2Ftracks%2FNow%20or%20Never%2Faudio%2F02-anyma_(ofc)-now_or_never_(extended_mix).mp3
