"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImg, fetchFile } from "../../../api/addTracks";
import classNames from "classnames/bind";
import styles from "./ProfileForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import { updateUserDoc } from "../../../api/signUp";

const cx = classNames.bind(styles);

function ProfileForm() {
  const { register, handleSubmit } = useForm();

  const { userData } = useLoginContext();
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
      console.log("img upload ------");
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

  return (
    <form className={cx("profile")} onSubmit={handleSubmit(onSubmit)}>
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
