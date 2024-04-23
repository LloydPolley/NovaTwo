"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";
import Form from "../Form/Form";

const cx = classNames.bind(styles);

function LoginForm({ signIn, Switcher }) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    const signInDetails = await signIn(email, password);

    if (signInDetails) {
      setError("login", {
        type: signInDetails.code,
      });
    }
  };

  const onChange = () => {
    clearErrors("login");
  };

  return (
    <Form title={"Login to Your Account"}>
      <form
        className={cx("auth-form")}
        onChange={onChange}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email">Email</label>
        <input id="email" placeholder="Your Email" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Your Password"
          type={"password"}
          name="password"
          {...register("password")}
        />
        {errors.login && <p>{errors.login.type.toString()}</p>}
        <input type="submit" value="Login" />
        <Switcher />
      </form>
    </Form>
  );
}

export default LoginForm;
