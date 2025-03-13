import FilterBar from "../../components/LayoutComps/FilterBar";
import TrackContainer from "@/components/Music/TrackContainer";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { tracks } from "@/db/schema";
import Header from "@/components/Header/Header";
import { TrackType } from "@/types/tracks";
import { ReleaseType } from "@/types/releases";

const filters = [
  { label: "Releases", url: `?f=releases` },
  { label: "Mix", url: `?f=mix` },
];

export default async function Dj({ searchParams: { f = "releases" } }) {
  const title = f === "mix" ? "Live Mixes" : "Releases";

  const items = await (f === "mix"
    ? (db.query.tracks.findMany({
        where: eq(tracks.mix, true),
      }) as Promise<TrackType[]>)
    : (db.query.releases.findMany({
        with: {
          tracks: true,
        },
      }) as Promise<ReleaseType[]>));

  return (
    <div className="flex-1">
      <Header title={title} />
      <FilterBar searchParams={{ f }} filters={filters} />
      <TrackContainer trackList={items} />
    </div>
  );
}
