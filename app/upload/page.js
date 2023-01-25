"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./upload.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm";
import UploadTrackForm from "../../components/forms/UploadtrackForm/UploadTrackForm";
import { useLoginContext } from "../../context/LoginContext";

const cx = classNames.bind(styles);

function UploadPage() {
  const [showLogin, setShowLogin] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isLoggedIn } = useLoginContext();

  return (
    <div className={cx("upload-page")}>
      {isLoggedIn ? (
        <>
          <h1>Upload your track</h1>
          <UploadTrackForm />
        </>
      ) : (
        <AuthWidget />
      )}
    </div>
  );
}

export default UploadPage;
