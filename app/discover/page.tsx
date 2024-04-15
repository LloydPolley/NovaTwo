import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackContainer from "../../components/Tracks/TrackContainer";
import Carousel from "../../components/Carousel";
import { getAllArtists } from "../../api/getTracks";
import Hero from "../../components/Hero";
import {
  getAllTracksOrdered,
  getArtistTracks,
  getTracksWhere,
} from "../../api/getTracks";
import FilterBar from "../../components/FilterBar";
import { Suspense } from "react";

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "?f=all" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

export default async function Dj({ searchParams, params }) {
  const filterType = searchParams.f;

  let tracks = [];

  if (filterType === "tracks") {
    tracks = await getTracksWhere("mix", false);
  } else if (filterType === "mix") {
    tracks = await getTracksWhere("mix", true);
  } else if (filterType === "all") {
    tracks = await getAllTracksOrdered("asc");
  }

  return (
    <>
      <FilterBar searchParams={searchParams} filters={filters} />
      <Suspense>
        <TrackContainer
          text={filterType}
          trackList={tracks}
          searchParams={searchParams}
          params={params}
          url={undefined}
        />
      </Suspense>
    </>
  );
}
