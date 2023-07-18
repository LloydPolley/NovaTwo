import classNames from "classnames/bind";
import styles from "./upload.module.scss";
import AuthWidget from "../../components/forms/AuthWidget/AuthWidget";
import UploadTrackForm from "../../components/forms/UploadtrackForm/UploadTrackForm";

const cx = classNames.bind(styles);

function UploadPage() {
  return (
    <div className={cx("upload-page")}>
      {/* <h1>Upload your track</h1> */}
      <UploadTrackForm />
      <AuthWidget />
    </div>
  );
}

export default UploadPage;
