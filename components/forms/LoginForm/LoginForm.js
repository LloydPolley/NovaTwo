import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";

const cx = classNames.bind(styles);

function LoginForm({ signIn }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signIn(email, password);
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div className={cx("form-container")}>
      <h1>LOG IN</h1>
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
