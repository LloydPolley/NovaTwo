"use client";

import { useState, useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";
import { useForm } from "react-hook-form";
import { uploadImg, fetchFile } from "../../api/addTracks";
import { updateUserDoc } from "../../api/signUp";
import Form from "./Form/Form";
import Image from "next/image";
import { Pencil } from "lucide-react";

function ProfileForm({ userData }) {
  const { artist } = userData;
  const { register, handleSubmit } = useForm({});

  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [fileName, setFileName] = useState("");
  const [previewImg, setPreviewImg] = useState(userData?.artwork || "");

  useEffect(() => {
    if (complete) {
      redirect(`/discover/${userData?.id}`, RedirectType.push);
    }
  }, [complete]);

  const onSubmit = async (data) => {
    const { profileImgForm, instagram, spotify, soundcloud } = data || {};

    let profileImgUrl, artwork;

    setLoading(true);

    console.log("profileImgForm", profileImgForm);

    if (profileImgForm.length !== 0) {
      console.log("upload");
      profileImgUrl = `gs://nova-2-1c493.appspot.com/${artist}/profile/${profileImgForm[0]?.name}`;
      await uploadImg({
        artist,
        file: profileImgForm[0],
      });
      artwork = await fetchFile(profileImgUrl);
    }

    await updateUserDoc({
      id: userData?.id,
      ...(artwork && { artwork }),
      ...(soundcloud && { soundcloud }),
      ...(instagram && { instagram }),
      ...(spotify && { spotify }),
    });

    setLoading(false);
    setComplete(true);
  };

  if (userData === null) {
    return null;
  }

  return (
    <Form title="Dashboard" loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex flex-col gap-5 my-5">
          <h2>Add/Edit Profile image</h2>
          <div className="w-full h-[200px] relative ">
            <label
              htmlFor="profile-upload"
              className="cursor-pointer block m-auto"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex z-10 bg-black/75 rounded-full size-11">
                <Pencil className="size-5 m-auto" />
              </div>
              {previewImg && (
                <Image
                  className="rounded-xl"
                  src={previewImg}
                  placeholder="blur"
                  blurDataURL={previewImg}
                  alt={userData?.artist}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </label>
          </div>
          <div className="flex flex-col items-center gap-4">
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("profileImgForm")}
              onInput={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                console.log("file", file);
                if (file) {
                  console.log("file exist");
                  setFileName(file.name);
                  const fileReader = new FileReader();
                  fileReader.onload = (event) => {
                    setPreviewImg(event.target.result);
                  };
                  fileReader.readAsDataURL(file);
                }
              }}
            />
            {fileName && (
              <p className="text-gray-600 text-nowrap text-ellipsis overflow-hidden max-w-56">
                {fileName}
              </p>
            )}
          </div>
        </div>

        <h2>Socials</h2>
        <input
          id="instagram"
          placeholder={userData?.instagram || "Instagram"}
          {...register("instagram")}
        />
        <input
          id="spotify"
          placeholder={userData?.spotify || "Spotify"}
          {...register("spotify")}
        />
        <input
          id="soundcloud"
          placeholder={userData?.soundcloud || "Soundcloud"}
          {...register("soundcloud")}
        />
        <input type="submit" value="Save" disabled={loading} />
      </form>
    </Form>
  );
}

export default ProfileForm;
