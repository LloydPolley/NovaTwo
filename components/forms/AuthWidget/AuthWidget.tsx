"use client";

import { useState } from "react";
import classNames from "classnames/bind";
// import styles from "./AuthWidget.module.scss";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { redirect, RedirectType } from "next/navigation";
import { signIn } from "../../../api/login";
import useAuthStore from "../../../context/AuthStore";

// const cx = classNames.bind(styles);

function SignInScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const { userData } = useAuthStore((state) => state);

  if (userData !== null && showLogin) {
    redirect(`/${userData?.uid}?f=all`, RedirectType.push);
  } else if (userData !== null && !showLogin) {
    redirect(`/edit`, RedirectType.push);
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
