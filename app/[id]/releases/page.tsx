import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../api/getDjs";
import { getArtistTracks } from "../../../api/getTracks";

import { Suspense } from "react";
import LoadingGrid from "../../../components/LoadingGrid";
import TrackContainer from "../../../components/Tracks/TrackContainer";
import FilterBar from "../../../components/FilterBar";

const cx = classNames.bind(styles);

export default async function DjProfile({ params }) {
  const user = await getDj(params?.id);
  const tracks = await getArtistTracks(user?.uid);

  return (
    <Suspense fallback={<LoadingGrid />}>
      <FilterBar />
      <TrackContainer tracks={tracks} />
    </Suspense>
  );
}