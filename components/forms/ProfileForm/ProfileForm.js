import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAddTrack from "../../../hooks/useAddTrack";
import classNames from "classnames/bind";
import styles from "./ProfileForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";

const cx = classNames.bind(styles);

function ProfileForm() {
  const { signOutUser, setAndUpdateUserDoc, userInfo, userData } =
    useLoginContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      displayName: "",
      name: "",
      photoURL: "",
    },
  });

  const { addUser, readUser } = useAddTrack();

  const onSubmit = (data) => {
    const { displayName, photoURL, name } = data;
    console.log("submnit");
    setAndUpdateUserDoc({ displayName, photoURL, name });
  };

  useEffect(() => {
    const { displayName, photoURL, name } = userData || {};

    setValue("displayName", displayName);
    setValue("photoURL", photoURL);
    setValue("name", name);
  }, [userInfo, userData]);

  return (
    <div className={cx("form-container")}>
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <p className={cx("display-name")}>
          {userInfo?.displayName || userInfo?.email}
        </p>
        <label>Name</label>
        <input placeholder={"Name"} {...register("name")} />
        <label>Display Name</label>
        <input placeholder={"Display name"} {...register("displayName")} />
        <label>Profile picture</label>
        <input
          placeholder={"photoURL"}
          type={"text"}
          name="photoURL"
          {...register("photoURL")}
        />
        <input type="submit" />
      </form>
      <button
        className={cx("logout-button")}
        onClick={() => {
          console.log("sign out");
          signOutUser();
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default ProfileForm;
