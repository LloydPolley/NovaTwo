"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImg, fetchFile } from "../../../api/addTracks";
import classNames from "classnames/bind";
import styles from "./ProfileForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import Form from "../Form/Form";
import Loading from "../../Loading";

const cx = classNames.bind(styles);

function ProfileForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { userData, isLoggedIn, setAndUpdateUserDoc } = useLoginContext();

  const [backgroundImg, setBackgroundImg] = useState();
  const [profileImg, setProfileImg] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setValue("name", userData?.displayName);
    }
  }, [userData]);

  const onSubmit = async (data) => {
    const { name, profileImgForm, backgroundImgForm } = data;
    const { displayName, uid } = userData;

    const profileImgUrl =
      profileImgForm &&
      `gs://novatwo-f3f41.appspot.com/${displayName}/profile/${profileImgForm[0]?.name}`;
    const backgroundImgUrl =
      backgroundImgForm &&
      `gs://novatwo-f3f41.appspot.com/${displayName}/profile/${backgroundImgForm[0]?.name}`;

    let profileImgAccess;
    let backgroundImgAccess;

    setLoading(true);

    if (profileImgForm) {
      await uploadImg({
        artist: displayName,
        file: profileImgForm[0],
        uid,
      });
      profileImgAccess = await fetchFile(profileImgUrl);
    }

    if (backgroundImgForm) {
      await uploadImg({
        artist: displayName,
        file: backgroundImgForm[0],
        uid,
      });

      backgroundImgAccess = await fetchFile(backgroundImgUrl);
    }
    console.log("background", backgroundImg);
    console.log("profile", profileImg);

    await setAndUpdateUserDoc({
      background: backgroundImgAccess,
      profile: profileImgAccess,
      uid,
    });

    setLoading(false);
  };

  console.log("isLoggedIn", isLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Form title={"Profile"}>
      <Loading isLoading={loading} />
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={"Display Name"} {...register("name")} required />
        <label htmlFor="profile-upload" className={cx("upload-element")}>
          {profileImg ? profileImg : "Upload Profile Image"}
        </label>
        <input
          className={cx("upload-button")}
          id="profile-upload"
          type="file"
          accept="image/*"
          {...register("profileImgForm")}
          onChange={(e) => {
            console.log("change", e.target.files);
            setProfileImg(e.target.files[0]?.name);
          }}
        />
        <label htmlFor="background-upload" className={cx("upload-element")}>
          {backgroundImg ? backgroundImg : "Upload Background image"}
        </label>
        <input
          className={cx("upload-button")}
          id="background-upload"
          type="file"
          accept="image/*"
          {...register("backgroundImgForm")}
          onChange={(e) => {
            console.log("change", e.target.files);
            setBackgroundImg(e.target.files[0]?.name);
          }}
        />

        <input type="submit" disabled={loading} />
      </form>
    </Form>
  );
}

export default ProfileForm;
