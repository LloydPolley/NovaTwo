"use client";

import { useState, useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";
import { useForm } from "react-hook-form";
import { uploadImg, fetchFile } from "../../api/addTracks";
import { updateUserDoc } from "../../api/signUp";
import useAuthStore from "../../context/AuthStore";
import Form from "./Form/Form";

function ProfileForm({}) {
  const { register, handleSubmit } = useForm();

  const { userData } = useAuthStore((state) => state);
  const [profileImg, setProfileImg] = useState("");

  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (complete) {
      redirect(`/${userData?.uid}?f=all`, RedirectType.push);
    }
  }, [complete]);

  const onSubmit = async (data) => {
    const { name, profileImgForm } = data;
    const { displayName } = userData;

    let profileImgUrl, profileImgAccess;

    setLoading(true);

    if (profileImgForm.length > 0) {
      profileImgUrl = `gs://nova-2-1c493.appspot.com/${displayName}/profile/${profileImgForm[0]?.name}`;
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

    console.log("uidate user updateUserDoc");

    setLoading(false);
    setComplete(true);
  };

  if (userData === null) {
    return null;
  }

  return (
    <Form title="Upload Profile" loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="profile-upload">Profile image</label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          placeholder="Display Name"
          {...register("profileImgForm")}
          onInput={(e) => {
            const file = (e.target as HTMLInputElement).files[0];
            setProfileImg(file?.name);
          }}
        />
        <input type="submit" value="Upload" disabled={loading} />
      </form>
    </Form>
  );
}

export default ProfileForm;
