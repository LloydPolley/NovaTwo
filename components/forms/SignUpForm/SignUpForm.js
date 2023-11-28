import { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./SignUpForm.module.scss";
import { useLoginContext } from "../../../context/LoginContext";
import Form from "../Form/Form";
import { registerUser } from "../../../api/signUp";

const cx = classNames.bind(styles);

function SignInForm({ Switcher }) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, displayName } = data;
    const details = await registerUser({ email, password, displayName });

    if (details) {
      setError("login", {
        type: details.code,
      });
    }
  };

  const onChange = () => {
    clearErrors("login");
  };

  return (
    <Form title="Create An Account">
      <form
        className={cx("auth-form")}
        onChange={onChange}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input placeholder="Email" {...register("email")} required />
        <input placeholder="Password" {...register("password")} required />
        <input
          placeholder="Display Name"
          {...register("displayName")}
          required
        />
        {errors.login && <p>{errors.login.type}</p>}
        <input type="submit" />
        <Switcher />
      </form>
    </Form>
  );
}

export default SignInForm;
