import { useState } from "react";
import { useForm } from "react-hook-form";
import useAddTrack from "../../../hooks/useAddTrack";
import classNames from "classnames/bind";
import styles from "./UploadTrackForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import { AggregateField } from "firebase/firestore";

const cx = classNames.bind(styles);

function UploadTrackForm() {
  // const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { userData } = useLoginContext();
  const { addTrack, uploadFile, fetchAudio } = useAddTrack();

  const onSubmit = async (data) => {
    const { name, audioFile, artworkFile } = data;
    console.log(data);
    const { displayName } = userData;

    const audioUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/tracks/${name}/audio/${audioFile[0].name}`;
    const artworkUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/tracks/${name}/artwork/${artworkFile[0].name}`;

    let audioAccess;
    let artworkAccess;

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
    });
  };

  return (
    <div className={cx("form-container")}>
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={"Track name"} {...register("name")} required />

        <label htmlFor="audio-upload" className={cx("upload-element")}>
          Upload audio
        </label>
        <input
          className={cx("upload-button")}
          id="audio-upload"
          type="file"
          {...register("audioFile")}
        />

        <label htmlFor="artwork-upload" className={cx("upload-element")}>
          Upload artwork
        </label>
        <input
          className={cx("upload-button")}
          id="artwork-upload"
          type="file"
          {...register("artworkFile")}
          onChange={(e) => {
            console.log("change", e.target.value);
          }}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default UploadTrackForm;
