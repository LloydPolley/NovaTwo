import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../api/getDjs";
import { getArtistTracks } from "../../api/getTracks";
import { getUserLikes } from "../../api/addLike";

import { Suspense } from "react";
import LoadingGrid from "../../components/LoadingGrid";
import TrackContainer from "../../components/Tracks/TrackContainer";
import FilterBar from "../../components/FilterBar";

export default async function DjProfile(props) {
  const { params, searchParams } = props;

  const tracks =
    searchParams.type === "likes"
      ? await getUserLikes(params?.id)
      : await getArtistTracks(params?.id);

  return (
    <Suspense fallback={<LoadingGrid />}>
      <FilterBar />
      <TrackContainer tracks={tracks} />
    </Suspense>
  );
}
