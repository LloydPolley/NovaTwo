import styles from "./Page.module.scss";
import AuthWidget from "../../components/forms/AuthWidget";
import Profileform from "../../components/forms/ProfileForm";
import { Suspense } from "react";

function SignInScreen() {
  return <Profileform />;
}

export default SignInScreen;
