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
      <TrackContainer searchParams={searchParams} params={params} />
    </>
  );
}
