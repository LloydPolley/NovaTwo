import classNames from "classnames/bind";
import styles from "./Page.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import UploadTrackForm from "../../components/forms/UploadtrackForm/UploadTrackForm";
import { Suspense } from "react";

const cx = classNames.bind(styles);

function SignInScreen() {
  return (
    <div className={cx("page")}>
      <Suspense>
        <UploadTrackForm />
      </Suspense>
    </div>
  );
}

export default SignInScreen;
