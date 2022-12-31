import { useState } from "react";
import { useForm } from "react-hook-form";
import useSignIn from "../../../hooks/useSignIn";
import useAddTrack from "../../../hooks/useAddTrack";
import classNames from "classnames/bind";
import styles from "./UploadTrackForm.module.scss";

const cx = classNames.bind(styles);

function UploadTrackForm() {
  // const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { addTrack, uploadTrack } = useAddTrack();

  const onSubmit = async (data) => {
    const { name, artist, file } = data;
    console.log("file", file);
    uploadTrack(artist, file[0]);
    addTrack({ name, artist, fileName: file[0].name });
  };

  return (
    <div className={cx("form-container")}>
      {/* <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          uploadTrack(file);
        }}
      >
        <input type="file" />
        <input type="submit" />
      </form> */}

      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={"Track"} {...register("name")} required />
        <input placeholder={"Artist"} {...register("artist")} required />
        <input type="file" {...register("file")} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default UploadTrackForm;
