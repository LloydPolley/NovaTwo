"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useSignIn from "../../hooks/useSignIn";
import classNames from "classnames/bind";
// import styles from "../styles/Profile.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm";
import UploadTrackForm from "../../components/forms/UploadtrackForm/UploadTrackForm";

// const cx = classNames.bind(styles);

function SignInScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { loggedInStatus, isLoggedIn, signOutUser } = useSignIn();

  return (
    <div className="profile-page">
      {isLoggedIn ? (
        <>
          <ProfileForm />
          <UploadTrackForm />
        </>
      ) : (
        <AuthWidget />
      )}
    </div>
  );
}

export default SignInScreen;
