import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../api/getDjs";
import { getArtistTracks, getAllLikedTracks } from "../../../api/getTracks";
import TracksWrapper from "../../../components/Tracks/TracksWrapper";
import { cookies } from "next/headers";
import Link from "next/link";
import ProfileForm from "../../../components/forms/ProfileForm/ProfileForm";
import UploadTrackForm from "../../../components/forms/UploadtrackForm/UploadTrackForm";
import Modal from "../../../components/Modal/Modal";
import Edit from "../../../components/Icons/Edit";
import UploadIcon from "../../../components/Icons/UploadIcon";
import Hero from "../../../components/Hero";
import { Suspense } from "react";

const cx = classNames.bind(styles);

export default async function DjProfile({ params, searchParams }) {
  const uid = cookies().get("uid")?.value;
  const user = await getDj(params?.id);
  const tracks = await getArtistTracks(params?.id);
  const { edit, upload } = searchParams;

  return (
    <div className={cx("artist")}>
      <div className={cx("artist__hero")}>
        <Hero title={user?.displayName} img={user?.profile} />
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

      <Suspense fallback={<p>Loading feed...</p>}>
        <TracksWrapper uid={uid} tracks={tracks} params={params} />
      </Suspense>

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
