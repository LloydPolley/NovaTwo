import { useState } from "react";
import { useForm } from "react-hook-form";
import useSignIn from "../../../hooks/useSignIn";
import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";

const cx = classNames.bind(styles);

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signIn } = useSignIn();

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password } = data;
    try {
      await signIn(email, password);
    } catch (e) {
      console.log("e", e);
    }
    // console.log("qqqqqqq", signInData);
  };

  return (
    <div className={cx("form-container")}>
      <p>Log In</p>
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email")} />
        <input
          placeholder="Password"
          type={"text"}
          name="password"
          {...register("password")}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginForm;
