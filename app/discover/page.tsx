import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackContainer from "../../components/Music/TrackContainer";
import { getTracksWhere, getAllReleases } from "../../api/getTracks";
import FilterBar from "../../components/LayoutComps/FilterBar";
import { Suspense } from "react";
import ArtistHero from "../../components/ArtistHero";

const cx = classNames.bind(styles);

const FILTER_TYPES = {
  RELEASES: "releases",
  MIX: "mix",
};

const filters = [
  { label: "Releases", url: `?f=${FILTER_TYPES.RELEASES}` },
  { label: "Mix", url: `?f=${FILTER_TYPES.MIX}` },
];

const IMAGES = {
  releases: "./3.jpg",
  mix: "./2.jpg",
};

const TITLES = {
  mix: "Live Mixes",
  releases: "Releases",
};

const filterFunctions = {
  [FILTER_TYPES.RELEASES]: () => getAllReleases(),
  [FILTER_TYPES.MIX]: () => getTracksWhere("mix", true),
};

export default async function Dj({ searchParams: { f, order }, params }) {
  const filterType = f;

  const filterFunction = filterFunctions[filterType];
  const tracks = await filterFunction();

  const img = IMAGES[filterType];
  const text = TITLES[filterType];

  return (
    <div className={cx("discover", `discover__${filterType}`)}>
      <ArtistHero title={text} user={{}} imgBox={img} box />
      <FilterBar searchParams={{ f }} filters={filters} />
      <Suspense>
        <TrackContainer trackList={tracks} />
      </Suspense>
    </div>
  );
}
