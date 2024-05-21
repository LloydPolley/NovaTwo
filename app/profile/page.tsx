import classNames from "classnames/bind";
import styles from "./Page.module.scss";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm";

const cx = classNames.bind(styles);

function SignInScreen() {
  return (
    <div className={cx("page")}>
      <ProfileForm />
    </div>
  );
}

export default SignInScreen;
