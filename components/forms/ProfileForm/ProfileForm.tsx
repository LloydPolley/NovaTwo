"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImg, fetchFile } from "../../../api/addTracks";
import classNames from "classnames/bind";
import styles from "./ProfileForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import Form from "../Form/Form";
import { useRouter } from "next/navigation";
import { updateUserDoc } from "../../../api/signUp";
import FileIcon from "../../Icons/FileIcon";

const cx = classNames.bind(styles);

function ProfileForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const { userData, isLoggedIn } = useLoginContext();
  const [profileImg, setProfileImg] = useState("");

  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [nameExists, setNameExists] = useState(null);

  useEffect(() => {
    if (userData) {
      setNameExists(userData?.displayName);
    }
  }, [userData]);

  useEffect(() => {
    if (finished) {
      router.push(`/${userData?.uid}?f=all`);
    }
  }, [finished]);

  const onSubmit = async (data) => {
    const { name, profileImgForm } = data;
    const { displayName, uid } = userData;

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

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Form title={"Upload Profile Image"}>
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
          <FileIcon />
          <p>{profileImg ? profileImg : "Upload artwork"}</p>
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

        <input type="submit" disabled={loading} />
      </form>
    </Form>
  );
}

export default ProfileForm;