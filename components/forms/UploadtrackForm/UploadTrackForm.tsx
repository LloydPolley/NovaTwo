"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addTrack, uploadFile, fetchFile } from "../../../api/addTracks";
import classNames from "classnames/bind";
import styles from "./UploadTrackForm.module.scss";
import Form from "../Form/Form";
import { redirect, RedirectType } from "next/navigation";
import FileIcon from "../../Icons/FileIcon";
import useAuthStore from "../../../context/AuthStore";

const cx = classNames.bind(styles);

function UploadTrackForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      album: "",
      label: "",
      mix: "release",
      artworkFile: "",
      audioFile: "",
    },
  });

  const { userData } = useAuthStore((state) => state);

  const [image, setImage] = useState("");
  const [audio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete) {
      redirect(`/${userData?.uid}?f=all`, RedirectType.push);
    }
  }, [complete]);

  const onSubmit = async (data) => {
    const { name, audioFile, artworkFile, label, mix, album } = data;
    console.log("data", data);
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
      album,
      uid,
      mix: mix === "mix" ? true : false,
    });

    setLoading(false);
    setComplete(true);
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

        <label htmlFor="album">Album</label>
        <input id="album" placeholder="Track album" {...register("album")} />

        <label htmlFor="label">Label</label>
        <input id="label" placeholder="Track label" {...register("label")} />

        <label htmlFor="label">Audio</label>
        <label htmlFor="audio-upload" className={cx("upload-form__widget")}>
          <p>{audio ? audio : "Upload audio"}</p>
        </label>
        <label htmlFor="label">Artwork</label>
        <label htmlFor="artwork-upload" className={cx("upload-form__widget")}>
          <p>{image ? image : "Upload artwork image"}</p>
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
          className={cx("upload-button")}
          id="audio-upload"
          type="file"
          accept=".mp3,audio/*"
          required
          {...register("audioFile")}
          onInput={(e) => {
            const file = (e.target as HTMLInputElement).files[0];
            setAudio(file?.name);
          }}
        />

        <input type="submit" value="Upload" disabled={loading} />
      </form>
    </Form>
  );
}

export default UploadTrackForm;
