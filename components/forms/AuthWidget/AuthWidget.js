"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AuthWidget.module.scss";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { useLoginContext } from "../../../context/LoginContext";
import { redirect } from "next/navigation";

const cx = classNames.bind(styles);

function SignInScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const { signIn, isLoggedIn, userInfo } = useLoginContext();

  console.log("userfda", userInfo, isLoggedIn);

  if (isLoggedIn) {
    redirect(`/discover/${userInfo?.uid}/releases`, "push");
  }

  return (
    <div className={cx("auth-widget")}>
      {showLogin ? <LoginForm signIn={signIn} /> : <SignUpForm />}
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Register" : "Log in"}
      </button>
    </div>
  );
}

export default SignInScreen;
