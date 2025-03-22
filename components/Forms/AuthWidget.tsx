"use client";

import { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUpForm";
import { redirect, RedirectType } from "next/navigation";
import { signIn } from "../../api/login";
import useAuthStore from "../../context/AuthStore";

function SignInScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const { userData } = useAuthStore((state) => state);

  if (!!userData && showLogin) {
    redirect(`/discover/${userData?.id}`, RedirectType.push);
  }

  const textToggle = showLogin
    ? "Need an account? Create one here"
    : "Already have an account? Sign in";

  const textStyle = {
    textDecoration: "underline",
    cursor: "pointer",
  };

  const switcher = () => (
    <p style={textStyle} onClick={() => setShowLogin(!showLogin)}>
      {textToggle}
    </p>
  );

  return (
    <>
      {showLogin ? (
        <LoginForm signIn={signIn} Switcher={switcher} />
      ) : (
        <SignUpForm Switcher={switcher} />
      )}
    </>
  );
}

export default SignInScreen;
