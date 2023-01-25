import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./SignUpForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";

const cx = classNames.bind(styles);

function SignInForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser } = useLoginContext();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    registerUser(email, password);
  };

  return (
    <div className={cx("form-container")}>
      <h1>SIGN UP</h1>
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="email" {...register("email")} />
        <input placeholder="password" {...register("password")} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SignInForm;
