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
  { label: "Mixes", url: "?f=mixes" },
  { label: "Likes", url: "?f=likes" },
];

export default async function DjProfile({ params, searchParams }) {
  let tracks;

  switch (searchParams.f) {
    case "likes":
      tracks = await getUserLikes(params?.id);
      break;
    case "tracks":
      tracks = await getTracksWhere("mix", false, params.id);
      break;
    case "mixes":
      tracks = await getTracksWhere("mix", true, params.id);
      break;
    default:
      tracks = await getArtistTracks(params?.id);
      break;
  }

  return (
    <Suspense fallback={<LoadingGrid />}>
      <FilterBar searchParams={searchParams} filters={filters} />
      <TrackContainer tracks={tracks} />
    </Suspense>
  );
}
