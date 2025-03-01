import FilterBar from "../../components/LayoutComps/FilterBar";
import ArtistHero from "../../components/ArtistHero";
import TrackContainer from "@/components/Music/TrackContainer";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { tracks } from "@/db/schema";
import Header from "@/components/Header/Header";

const FILTER_TYPES = {
  RELEASES: "releases",
  MIX: "mix",
};

const filters = [
  { label: "Releases", url: `?f=${FILTER_TYPES.RELEASES}` },
  { label: "Mix", url: `?f=${FILTER_TYPES.MIX}` },
];

const TITLES = {
  mix: "Live Mixes",
  releases: "Releases",
};

const filterFunctions = {
  [FILTER_TYPES.RELEASES]: async () => await db.query.releases.findMany({}),
  [FILTER_TYPES.MIX]: async () =>
    await db.query.tracks.findMany({
      where: eq(tracks.mix, true),
    }),
};

export default async function Dj({ searchParams: { f, order }, params }) {
  const filterType = f;

  const filterFunction = filterFunctions[filterType];
  const tracks = await filterFunction();

  const text = TITLES[filterType];

  return (
    <div className="flex-1">
      <Header title={text} />

      <FilterBar searchParams={{ f }} filters={filters} />
      <TrackContainer trackList={tracks} />
    </div>
  );
}
