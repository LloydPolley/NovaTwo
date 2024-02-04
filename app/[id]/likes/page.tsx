// "use client";

import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../api/getDjs";
import { getAllLikedTracks, getArtistTracks } from "../../../api/getTracks";
import { Suspense } from "react";
import LoadingGrid from "../../../components/LoadingGrid";
import TrackContainer from "../../../components/Tracks/TrackContainer";
import { getUserLikes } from "../../../api/addLike";
import { revalidatePath } from "next/cache";
import FilterBar from "../../../components/FilterBar";

export default async function DjProfile({ params }) {
  const tracks = await getUserLikes(params?.id);

  return (
    <Suspense fallback={<LoadingGrid />}>
      <FilterBar />
      <TrackContainer tracks={tracks} />
    </Suspense>
  );
}
