import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackContainerServer from "../../components/Tracks/TrackContainer/TrackContainerServer";
import Carousel from "../../components/Carousel";
import { getAllArtists } from "../../api/getTracks";
import Hero from "../../components/Hero";
import {
  getAllTracksOrdered,
  getArtistTracks,
  getTracksWhere,
} from "../../api/getTracks";
import FilterBar from "../../components/FilterBar";

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "?f=all" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

export default async function Dj({ searchParams, params }) {
  const filterType = searchParams.f;

  console.log("filter type", filterType);

  let tracks = [];

  if (filterType === "tracks") {
    tracks = await getTracksWhere("mix", false);
  } else if (filterType === "mix") {
    tracks = await getTracksWhere("mix", true);
  } else {
    tracks = await getAllTracksOrdered("asc");
  }

  return (
    <>
      <FilterBar searchParams={searchParams} filters={filters} />
      <TrackContainerServer text={filterType} tracks={tracks} />
    </>
  );
}
