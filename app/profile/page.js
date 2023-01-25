"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm";
import UploadTrackForm from "../../components/forms/UploadtrackForm/UploadTrackForm";
import { useLoginContext } from "../../context/LoginContext";

const cx = classNames.bind(styles);

function SignInScreen() {
  const { isLoggedIn } = useLoginContext();

  return (
    <div className={cx("profile-page")}>
      {isLoggedIn ? (
        <>
          <h1>Edit Profile</h1>
          <ProfileForm />
        </>
      ) : (
        <AuthWidget />
      )}
    </div>
  );
}

export default SignInScreen;
