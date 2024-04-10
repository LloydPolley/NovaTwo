import classNames from "classnames/bind";
import styles from "./Page.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import UploadTrackForm from "../../components/forms/UploadtrackForm/UploadTrackForm";

const cx = classNames.bind(styles);

function SignInScreen() {
  return (
    <div className={cx("page")}>
      <UploadTrackForm />
    </div>
  );
}

export default SignInScreen;
