import { useState } from "react";
import { useForm } from "react-hook-form";
import useSignIn from "../../../hooks/useSignIn";
import useAddTrack from "../../../hooks/useAddTrack";
import classNames from "classnames/bind";
import styles from "./ProfileForm.module.scss";

const cx = classNames.bind(styles);

function ProfileForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signOutUser, updateUserProfile, userInfo } = useSignIn();
  const { addUser, readUser } = useAddTrack();

  const onSubmit = (data) => {
    console.log(data);
    const { displayName, photoURL } = data;
    updateUserProfile(displayName, photoURL);
  };

  return (
    <div className={cx("form-container")}>
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <p>{userInfo?.displayName || userInfo?.email}</p>
        <input
          placeholder={userInfo?.displayName || "Display name"}
          {...register("displayName")}
        />
        <input
          placeholder={userInfo?.photoURL || "PhotoURL"}
          type={"text"}
          name="photoURL"
          {...register("photoURL")}
        />
        <input type="submit" />
      </form>
      <button
        className={cx("logout-button")}
        onClick={() => {
          signOutUser();
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default ProfileForm;
