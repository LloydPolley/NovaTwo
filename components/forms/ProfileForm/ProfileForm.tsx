"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImg, fetchFile } from "../../../api/addTracks";
import classNames from "classnames/bind";
import styles from "./ProfileForm.module.scss";
import { updateUserDoc } from "../../../api/signUp";
import useAuthStore from "../../../context/AuthStore";

const cx = classNames.bind(styles);

function ProfileForm({}) {
  const { register, handleSubmit } = useForm();

  const { userData } = useAuthStore((state) => state);
  const [show, setShow] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const onSubmit = async (data) => {
    const { name, profileImgForm } = data;
    const { displayName } = userData;

    let profileImgUrl, profileImgAccess;

    setLoading(true);

    if (profileImgForm.length > 0) {
      profileImgUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/profile/${profileImgForm[0]?.name}`;
      await uploadImg({
        artist: displayName,
        file: profileImgForm[0],
      });
      profileImgAccess = await fetchFile(profileImgUrl);
    }

    await updateUserDoc(userData?.uid, {
      profile: profileImgAccess,
      displayName: name,
    });

    setLoading(false);
    setFinished(true);
  };

  if (userData === null) {
    return null;
  }

  if (!show) {
    return (
      <div
        className={cx("edit-button")}
        onClick={() => {
          setShow(true);
        }}
      >
        Edit
      </div>
    );
  }

  return (
    <form className={cx("profile")} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cx("profile__close")}
        onClick={() => {
          setShow(false);
        }}
      >
        X
      </div>
      <p>{profileImg ? profileImg : "Edit Profile"}</p>
      <label htmlFor="profile-upload" className={cx("upload-element")}>
        Edit
      </label>
      <input
        className={cx("upload-button")}
        id="profile-upload"
        type="file"
        accept="image/*"
        {...register("profileImgForm")}
        onInput={(e) => {
          const file = (e.target as HTMLInputElement).files[0];
          setProfileImg(file?.name);
        }}
      />
      <input type="submit" value="Upload" disabled={loading} />
    </form>
  );
}

export default ProfileForm;
