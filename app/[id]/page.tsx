import TrackContainer from "../../components/Tracks/TrackContainer";
import FilterBar from "../../components/FilterBar";
import Carousel from "../../components/Carousel";
import { getUserFollowers } from "../../api/addFollower";
import UserFollowing from "../../components/UserFollowing";

const filters = [
  { label: "All", url: "?f=all" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
  { label: "Likes", url: "?f=likes" },
  { label: "Following", url: "?f=following" },
];

export default async function DjProfile({ params, searchParams }) {
  const users = await getUserFollowers(params?.id);

  return (
    <>
      <FilterBar searchParams={searchParams} filters={filters} />
      <UserFollowing users={users} searchParams={searchParams} hp={false} />
      <TrackContainer searchParams={searchParams} params={params} />
    </>
  );
}
