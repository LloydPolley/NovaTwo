"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImg, fetchFile } from "../../../api/addTracks";
import classNames from "classnames/bind";
import styles from "./ProfileForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import Form from "../Form/Form";
import Loading from "../../Loading";
import Link from "next/link";

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
  const [nameExists, setNameExists] = useState(null);

  useEffect(() => {
    if (userData) {
      setNameExists(userData?.displayName);
    }
  }, [userData]);

  const onSubmit = async (data) => {
    const { name, profileImgForm, backgroundImgForm } = data;
    const { displayName, uid } = userData;

    let profileImgUrl, backgroundImgUrl, profileImgAccess, backgroundImgAccess;

    setLoading(true);

    if (profileImgForm.length > 0) {
      profileImgUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/profile/${profileImgForm[0]?.name}`;

      await uploadImg({
        artist: displayName,
        file: profileImgForm[0],
        uid,
      });
      profileImgAccess = await fetchFile(profileImgUrl);
    }

    if (backgroundImgForm.length > 0) {
      backgroundImgUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/profile/${backgroundImgForm[0]?.name}`;

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
      displayName: name,
    });

    setLoading(false);
  };

  console.log("isLoggedIn", isLoggedIn);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Form title={"Profile"}>
      <Link className={cx("")} href={`?edit=false`}>
        X
      </Link>
      <Loading isLoading={loading} />
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        {!nameExists && (
          <>
            <input
              placeholder={"Display Name"}
              {...register("name")}
              required
            />
          </>
        )}
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
