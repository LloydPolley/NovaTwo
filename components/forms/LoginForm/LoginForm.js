import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";
import Form from "../Form/Form";

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
    <Form title={"Sign in"}>
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
    </Form>
  );
}

export default LoginForm;
