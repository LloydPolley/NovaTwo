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
  const { addTrack, uploadTrack } = useAddTrack();

  console.log("uyser", userData);

  const onSubmit = async (data) => {
    const { name, artist, file } = data;
    const { displayName } = userData;
    console.log("file", file);
    uploadTrack({ name, artist: displayName, file: file[0] });
    addTrack({ name, artist: displayName, fileName: file[0].name });
  };

  return (
    <div className={cx("form-container")}>
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={"Track name"} {...register("name")} required />
        <input type="file" {...register("file")} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default UploadTrackForm;
