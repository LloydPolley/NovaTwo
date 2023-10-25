import classNames from "classnames/bind";
import styles from "./Page.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import Profileform from "../../components/forms/ProfileForm/ProfileForm";

const cx = classNames.bind(styles);

function SignInScreen() {
  return (
    <div className={cx("page")}>
      <Profileform />
    </div>
  );
}

export default SignInScreen;
