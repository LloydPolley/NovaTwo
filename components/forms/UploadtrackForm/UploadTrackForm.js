"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useAddTrack from "../../../hooks/useAddTrack";
import classNames from "classnames/bind";
import styles from "./UploadTrackForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import Form from "../Form/Form";
import Loading from "../../Loading";

const cx = classNames.bind(styles);

function UploadTrackForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { userData, isLoggedIn } = useLoginContext();
  const { addTrack, uploadFile, fetchAudio } = useAddTrack();

  const [image, setImage] = useState();
  const [audio, setAudio] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { name, audioFile, artworkFile, label } = data;
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
      artworkAccess = await fetchAudio(artworkUrl);
    }

    if (audioFile) {
      await uploadFile({
        trackName: name,
        artist: displayName,
        file: audioFile[0],
        type: "audio",
      });

      audioAccess = await fetchAudio(audioUrl);
    }

    await addTrack({
      name,
      artist: displayName,
      trackName: audioFile[0].name,
      audioFileLocation: audioAccess,
      artworkFileLocation: artworkAccess,
      label,
      uid,
    });

    setLoading(false);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Form title={"Upload"}>
      <Loading isLoading={loading} />
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
          onChange={(e) => {
            console.log("change", e.target.files);
            setAudio(e.target.files[0]?.name);
          }}
        />
        <label htmlFor="artwork-upload" className={cx("upload-element")}>
          {image ? image : "Upload artwork"}
        </label>
        <input
          className={cx("upload-button")}
          id="artwork-upload"
          type="file"
          accept="image/*"
          required
          {...register("artworkFile")}
          onChange={(e) => {
            console.log("change", e.target.files);
            setImage(e.target.files[0]?.name);
          }}
        />

        <input type="submit" disabled={loading} />
      </form>
    </Form>
  );
}

export default UploadTrackForm;
