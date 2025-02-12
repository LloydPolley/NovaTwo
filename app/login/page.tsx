import classNames from "classnames/bind";
import styles from "./Page.module.scss";
import AuthWidget from "../../components/Forms/AuthWidget";
import ProfileForm from "../../components/Forms/ProfileForm";
import { Suspense } from "react";

const cx = classNames.bind(styles);

function SignInScreen() {
  return (
    <div className={cx("page")}>
      <Suspense>
        <AuthWidget />
      </Suspense>
    </div>
  );
}

export default SignInScreen;
