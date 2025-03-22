"use client";

import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import Input from "../Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function LoginForm({ signIn, Switcher }) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    const signInDetails = await signIn(email, password);

    console.log("signInDetails", signInDetails);

    if (signInDetails) {
      setError("email", {
        type: signInDetails.code,
      });
    }
  };

  const onChange = () => {
    clearErrors("email");
  };

  return (
    <Form title={"Sign In"}>
      <form onChange={onChange} onSubmit={handleSubmit(onSubmit)}>
        <Input
          classNames=""
          id="email"
          placeholder="Your Email"
          register={register("email")}
          onInputFunc={() => {}}
        />
        <input
          id="password"
          placeholder="Your Password"
          type={"password"}
          name="password"
          {...register("password")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input className="submit" type="submit" value="Sign In" />
        <Switcher />
      </form>
    </Form>
  );
}

export default LoginForm;
