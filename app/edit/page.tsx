import styles from "./Page.module.scss";
import AuthWidget from "../../components/Forms/AuthWidget";
import Profileform from "../../components/Forms/ProfileForm";
import { Suspense } from "react";

function SignInScreen() {
  return <Profileform />;
}

export default SignInScreen;
