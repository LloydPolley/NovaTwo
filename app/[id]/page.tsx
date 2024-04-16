import TrackContainer from "../../components/Tracks/TrackContainer";
import FilterBar from "../../components/FilterBar";
import Carousel from "../../components/Carousel";
import { getUserFollowers } from "../../api/addFollower";
import UserFollowing from "../../components/UserFollowing";
import { getDj } from "../../api/getDjs";
import AritstHero from "../../components/ArtistHero";
import { Suspense } from "react";

const filters = [
  { label: "All", url: "?f=all" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
  { label: "Likes", url: "?f=likes" },
  { label: "Following", url: "?f=following" },
];

export default async function DjProfile({ params, searchParams }) {
  const user = await getDj(params?.id);

  return (
    <>
      <AritstHero title={user?.displayName} img={user?.profile} user={user} />
      <FilterBar searchParams={searchParams} filters={filters} />
      <UserFollowing searchParams={searchParams} params={params} />
      <Suspense fallback={"hello"}>
        <TrackContainer
          searchParams={searchParams}
          params={params}
          text={undefined}
          trackList={undefined}
          url={undefined}
        />
      </Suspense>
    </>
  );
}
