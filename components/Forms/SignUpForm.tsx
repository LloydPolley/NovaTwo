"use client";

import { useForm } from "react-hook-form";
import Form from "./Form/Form";
import { registerUser } from "../../api/signUp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  artistName: z.string().min(3, "Artist name must be at least 3 characters"),
});

function SignUpForm({ Switcher, userData }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password, artistName } = data;
    const details = await registerUser({ email, password, artistName });

    if (details) {
      setError("email", {
        type: details?.code,
      });
      return;
    }

    router.push(`/`);
  };

  const onChange = () => {
    clearErrors("email");
  };

  return (
    <Form title="Create Account">
      <form onChange={onChange} onSubmit={handleSubmit(onSubmit)}>
        <input id="email" placeholder="Email" {...register("email")} required />
        <input
          id="password"
          placeholder="Password"
          {...register("password")}
          required
        />
        <input
          id="artistName"
          placeholder="Artist Name"
          {...register("artistName")}
          required
        />
        <input type="submit" value="Create Account" />
        <Switcher />
      </form>
    </Form>
  );
}

export default SignUpForm;
