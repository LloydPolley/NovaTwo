import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../api/getDjs";
import { getArtistTracks, getAllLikedTracks } from "../../../api/getTracks";
import TrackListContainer from "../../../components/TrackListContainer";
import { cookies } from "next/headers";
import Link from "next/link";
import ProfileForm from "../../../components/forms/ProfileForm/ProfileForm";
import UploadTrackForm from "../../../components/forms/UploadtrackForm/UploadTrackForm";
import Modal from "../../../components/Modal/Modal";
import Edit from "../../../components/Icons/Edit";
import UploadIcon from "../../../components/Icons/UploadIcon";

const cx = classNames.bind(styles);

export default async function DjProfile({ params, searchParams }) {
  const uid = cookies().get("uid")?.value;
  const likes = await getAllLikedTracks(uid);
  const user = await getDj(params?.id);
  const tracks = await getArtistTracks(params?.id);
  const { edit, upload } = searchParams;

  return (
    <div className={cx("artist")}>
      <div
        className={cx("artist__hero")}
        style={{ backgroundImage: `url(${user?.profile})` }}
      >
        {/* <Image
          className={cx("artist__img")}
          src={user?.profile}
          width={250}
          height={250}
          // fill={true}
          objectFit={"contain"}
          alt="Picture of the author"
        /> */}
        <h1>{user?.displayName}</h1>
        {uid === params?.id && (
          <>
            <Link className={cx("artist__edit")} href={`?edit=true`}>
              <Edit />
            </Link>
            <Link className={cx("artist__upload")} href={`?upload=true`}>
              <UploadIcon />
            </Link>
          </>
        )}
      </div>

      <TrackListContainer
        uid={uid}
        tracks={tracks}
        likes={likes}
        params={params}
      />
      {edit === "true" && (
        <Modal>
          <ProfileForm />
        </Modal>
      )}
      {upload === "true" && (
        <Modal>
          <UploadTrackForm />
        </Modal>
      )}
    </div>
  );
}
