import classNames from "classnames/bind";
import styles from "./Page.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import Profileform from "../../components/forms/ProfileForm/ProfileForm";
import { Suspense } from "react";

const cx = classNames.bind(styles);

function SignInScreen() {
  return (
    <Suspense>
      <Profileform />
    </Suspense>
  );
}

export default SignInScreen;
