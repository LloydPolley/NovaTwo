"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AuthWidget.module.scss";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { useLoginContext } from "../../../context/LoginContext";
import { redirect } from "next/navigation";
import { signIn } from "../../../api/login";

const cx = classNames.bind(styles);

function SignInScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const { isLoggedIn, userData } = useLoginContext();

  if (isLoggedIn && showLogin) {
    console.log("userdata --------------", userData);
    redirect(`/discover/${userData?.uid}/releases`, "push");
  } else if (isLoggedIn && !showLogin) {
    redirect(`/edit`, "push");
  }

  const switcher = () => (
    <>
      {showLogin ? (
        <p>Need an account? Create one here</p>
      ) : (
        <p>Already have an account? Sign in</p>
      )}
      <button className={cx("switch")} onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Create Account" : "Sign in"}
      </button>
    </>
  );

  return (
    <div className={cx("auth-widget")}>
      {showLogin ? (
        <LoginForm signIn={signIn} Switcher={switcher} />
      ) : (
        <SignUpForm Switcher={switcher} />
      )}
    </div>
  );
}

export default SignInScreen;
