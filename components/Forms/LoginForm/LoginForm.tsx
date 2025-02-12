"use client";

import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import Input from "../Input";

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
      <form onChange={onChange} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          placeholder="Your Email"
          register={register("email")}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Your Password"
          type={"password"}
          name="password"
          {...register("password")}
        />
        {errors.login && <p>{errors.login.type.toString()}</p>}
        <input className="submit" type="submit" value="Login" />
        <Switcher />
      </form>
    </Form>
  );
}

export default LoginForm;
