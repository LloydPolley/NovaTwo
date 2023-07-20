import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./SignUpForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import Form from "../Form/Form";

const cx = classNames.bind(styles);

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser } = useLoginContext();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password, displayName } = data;
    registerUser({ email, password, displayName });
  };

  return (
    <Form title="Sign up">
      <form className={cx("auth-form")} onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="email" {...register("email")} required />
        <input placeholder="password" {...register("password")} required />
        <input
          placeholder="Display Name"
          {...register("displayName")}
          required
        />
        <input type="submit" />
      </form>
    </Form>
  );
}

export default SignInForm;
