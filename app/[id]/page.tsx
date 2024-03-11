import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../api/getDjs";
import { getArtistTracks, getTracksWhere } from "../../api/getTracks";
import { getUserLikes } from "../../api/addLike";

import { Suspense } from "react";
import LoadingGrid from "../../components/LoadingGrid";
import TrackContainer from "../../components/Tracks/TrackContainer";
import FilterBar from "../../components/FilterBar";

const filters = [
  { label: "All", url: "?f=all" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
  { label: "Likes", url: "?f=likes" },
];

export default async function DjProfile({ params, searchParams }) {
  return (
    <>
      <FilterBar searchParams={searchParams} filters={filters} />
      <Suspense fallback={<LoadingGrid />}>
        <TrackContainer searchParams={searchParams} params={params} />
      </Suspense>
    </>
  );
}
