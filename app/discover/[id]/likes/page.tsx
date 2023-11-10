import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../../api/getDjs";
import { getAllLikedTracks } from "../../../../api/getTracks";
import { Suspense } from "react";
import LoadingGrid from "../../../../components/LoadingGrid";
import TrackContainer from "../../../../components/Tracks/TrackContainer";

const cx = classNames.bind(styles);

export default async function DjProfile({ params }) {
  const user = await getDj(params?.id);
  const tracks = await getAllLikedTracks(user?.uid);

  return (
    <Suspense fallback={<LoadingGrid />}>
      <TrackContainer tracks={tracks} />
    </Suspense>
  );
}
