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

  const [loading, setLoading] = useState(false);
  const [nameExists, setNameExists] = useState(null);

  useEffect(() => {
    if (userData) {
      setNameExists(userData?.displayName);
    }
  }, [userData]);

  const onSubmit = async (data) => {
    const { name, profileImgForm } = data;
    const { displayName, uid } = userData;

    let profileImgUrl, profileImgAccess, backgroundImgAccess;

    setLoading(true);

    console.log("profileImgForm", profileImgForm);

    if (profileImgForm.length > 0) {
      profileImgUrl = `gs://novatwo-f3f41.appspot.com/${displayName}/profile/${profileImgForm[0]?.name}`;
      console.log("img upload");
      await uploadImg({
        artist: displayName,
        file: profileImgForm[0],
        uid,
      });
      profileImgAccess = await fetchFile(profileImgUrl);
    }

    await setAndUpdateUserDoc({
      background: backgroundImgAccess,
      profile: profileImgAccess,
      uid,
      displayName: name,
    });

    setLoading(false);
  };

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
        />

        <input type="submit" disabled={loading} />
      </form>
    </Form>
  );
}

export default ProfileForm;
