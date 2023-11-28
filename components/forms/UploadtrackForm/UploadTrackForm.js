"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addTrack, uploadFile, fetchFile } from "../../../api/addTracks";
import classNames from "classnames/bind";
import styles from "./UploadTrackForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import Form from "../Form/Form";
import Loading from "../../Loading";
import Link from "next/link";
import { redirect } from "next/navigation";

const cx = classNames.bind(styles);

function UploadTrackForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { userData, isLoggedIn } = useLoginContext();

  const [image, setImage] = useState();
  const [audio, setAudio] = useState();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete) {
      redirect(`/discover/${userData?.uid}/releases`, "push");
    }
  }, [complete]);

  const onSubmit = async (data) => {
    const { name, audioFile, artworkFile, label, mix } = data;
    const { displayName, uid } = userData;

    const audioUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/tracks/${name}/audio/${audioFile[0].name}`;
    const artworkUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/tracks/${name}/artwork/${artworkFile[0].name}`;

    let audioAccess;
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
    }

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
      artworkFileLocation: artworkAccess,
      label,
      uid,
      mix,
    });

    setLoading(false);
    setComplete(true);
    // redirect(
    //   `${window.location.origin}${window.location.pathname}?upload=false`,
    //   "push"
    // );
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Form title={"Uploads"} loading={loading}>
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={"Track name"} {...register("name")} required />
        <input placeholder={"Label"} {...register("label")} required />
        <label htmlFor="audio-upload" className={cx("upload-element")}>
          {audio ? audio : "Upload audio"}
        </label>
        <input
          className={cx("upload-button")}
          id="audio-upload"
          type="file"
          accept=".mp3,audio/*"
          required
          {...register("audioFile")}
          onInput={(e) => {
            setAudio(e.target.files[0]?.name);
          }}
        />
        <label htmlFor="artwork-upload" className={cx("upload-element")}>
          {image ? image : "Upload artwork"}
        </label>
        <div className={cx("mix-toggle")}>
          <p>Is Mix</p>
          <input
            type="checkbox"
            id="mix"
            placeholder={"Mix"}
            {...register("mix")}
          />
        </div>

        <input
          className={cx("upload-button")}
          id="artwork-upload"
          type="file"
          accept="image/*"
          required
          {...register("artworkFile")}
          onInput={(e) => {
            setImage(e.target.files[0]?.name);
          }}
        />

        <input type="submit" disabled={loading} />
      </form>
    </Form>
  );
}

export default UploadTrackForm;
