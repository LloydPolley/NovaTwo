// "use client";

import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../../api/getDjs";
import { getAllLikedTracks, getArtistTracks } from "../../../../api/getTracks";
import { Suspense } from "react";
import LoadingGrid from "../../../../components/LoadingGrid";
import TrackContainer from "../../../../components/Tracks/TrackContainer";
import { getUserLikes } from "../../../../api/addLike";

const cx = classNames.bind(styles);

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
export const revalidate = 1;

export default async function DjProfile({ params }) {
  console.log("params", params);
  const user = await getDj(params?.id);
  const tracks = await getAllLikedTracks(user?.uid);
  // const likes = await getUserLikes(user.uid);

  return (
    <Suspense fallback={<LoadingGrid />}>
      <TrackContainer tracks={tracks} />
    </Suspense>
  );
}
