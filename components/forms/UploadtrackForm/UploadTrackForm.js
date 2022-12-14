import { useState } from "react";
import { useForm } from "react-hook-form";
import useSignIn from "../../../hooks/useSignIn";
import useAddTrack from "../../../hooks/useAddTrack";
import classNames from "classnames/bind";
import styles from "./UploadTrackForm.module.scss";

const cx = classNames.bind(styles);

function UploadTrackForm() {
  const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { uploadTrack } = useAddTrack();

  const onSubmit = (data) => {
    const { trackName } = data;
    uploadTrack(trackName);
  };

  return (
    <div className={cx("form-container")}>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          uploadTrack(file);
        }}
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      >
        <input type="file" />
        <input type="submit" />
      </form>

      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={"Track name"} {...register("trackName")} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default UploadTrackForm;
