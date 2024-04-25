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
import ArtistHero from "../../components/ArtistHero";

const cx = classNames.bind(styles);

const FILTER_TYPES = {
  ALL: "all",
  TRACKS: "tracks",
  MIX: "mix",
};

const filters = [
  { label: "All", url: `?f=${FILTER_TYPES.ALL}` },
  { label: "Tracks", url: `?f=${FILTER_TYPES.TRACKS}` },
  { label: "Mix", url: `?f=${FILTER_TYPES.MIX}` },
];

const IMAGES = {
  tracks: "./3.jpg",
  mix: "./2.jpg",
  all: "./1.jpg",
};

const TITLES = {
  mix: "Live Mixes",
  tracks: "Releases",
  all: "All",
};

const filterFunctions = {
  [FILTER_TYPES.TRACKS]: () => getTracksWhere("mix", false),
  [FILTER_TYPES.MIX]: () => getTracksWhere("mix", true),
  [FILTER_TYPES.ALL]: () => getAllTracksOrdered("asc"),
};

export default async function Dj({ searchParams: { f, order }, params }) {
  const filterType = f || FILTER_TYPES.ALL;

  console.log("filtertype", filterType);

  const filterFunction = filterFunctions[filterType];
  const tracks = await filterFunction();

  const img = IMAGES[filterType];
  const text = TITLES[filterType];

  return (
    <div className={cx("discover", `discover__${filterType}`)}>
      <ArtistHero title={text} user={{}} imgBox={img} overlay box />
      <FilterBar searchParams={{ f }} filters={filters} />
      <Suspense>
        <TrackContainer
          trackList={tracks}
          searchParams={{ f }}
          params={params}
          url={undefined}
        />
      </Suspense>
    </div>
  );
}
