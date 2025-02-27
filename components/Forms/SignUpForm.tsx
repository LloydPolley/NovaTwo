import { useForm } from "react-hook-form";
import Form from "./Form/Form";
import { registerUser } from "../../api/signUp";

function SignInForm({ Switcher }) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, artist } = data;
    console.log("artist", artist);
    const details = await registerUser({ email, password, artist });

    if (details) {
      setError("login", {
        type: details?.code,
      });
    }
  };

  const onChange = () => {
    clearErrors("login");
  };

  return (
    <Form title="Create An Account">
      <form onChange={onChange} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input id="email" placeholder="Email" {...register("email")} required />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Password"
          {...register("password")}
          required
        />

        <label htmlFor="artist">Display Name</label>
        <input
          id="artist"
          placeholder="Artist Name"
          {...register("artist")}
          required
        />

        {/* {errors.login && <p>{errors}</p>} */}
        <input type="submit" value="Create Account" />
        <Switcher />
      </form>
    </Form>
  );
}

export default SignInForm;
