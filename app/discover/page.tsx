import TrackContainer from "../../components/Music/TrackContainer";
import FilterBar from "../../components/LayoutComps/FilterBar";
import { Suspense } from "react";
import ArtistHero from "../../components/ArtistHero";

const FILTER_TYPES = {
  RELEASES: "releases",
  MIX: "mix",
};

const filters = [
  { label: "Releases", url: `?f=${FILTER_TYPES.RELEASES}` },
  { label: "Mix", url: `?f=${FILTER_TYPES.MIX}` },
];

const IMAGES = {
  releases:
    "https://images.pexels.com/photos/29708306/pexels-photo-29708306/free-photo-of-abstract-digital-art-with-fluid-shape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  mix: "https://images.pexels.com/photos/29488853/pexels-photo-29488853/free-photo-of-dynamic-geometric-abstract-art-with-bold-colors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

const TITLES = {
  mix: "Live Mixes",
  releases: "Releases",
};

const filterFunctions = {
  // [FILTER_TYPES.RELEASES]: () => getAllReleases(),
  // [FILTER_TYPES.MIX]: () => getTracksWhere("mix", true),
};

export default async function Dj({ searchParams: { f, order }, params }) {
  const filterType = f;

  const filterFunction = filterFunctions[filterType];
  const tracks = await filterFunction();

  const img = IMAGES[filterType];
  const text = TITLES[filterType];

  return (
    <div className="flex-1">
      <ArtistHero title={text} user={{}} img={img} />
      <FilterBar searchParams={{ f }} filters={filters} />
      <Suspense>
        <TrackContainer trackList={tracks} />
      </Suspense>
    </div>
  );
}
