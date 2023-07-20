import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm";

const cx = classNames.bind(styles);

function SignInScreen() {
  return (
    <div className={cx("profile-page")}>
      <h1>Edit Profile</h1>
      <ProfileForm />
      <AuthWidget />
    </div>
  );
}

export default SignInScreen;
