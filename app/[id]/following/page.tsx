import FilterBar from "../../../components/LayoutComps/FilterBar";
import UserFollowing from "../../../components/User/UserFollowing";
import { getDj } from "../../../api/getDjs";
import AritstHero from "../../../components/ArtistHero";
import { Suspense } from "react";
import TrackContainer from "../../../components/Music/TrackContainer";
import { getUserFollowers } from "../../../api/addFollower";

export default async function DjProfile({ params, searchParams }) {
  const user = await getDj(params?.id);
  const following = await getUserFollowers(params?.id);

  return (
    <div className="rounded flex-grow">
      <AritstHero title={user?.displayName} img={user?.profile} user={user} />
      {/* <TrackContainer
        searchParams={searchParams}
        params={params}
        text={undefined}
        trackList={following}
        url={undefined}
      /> */}
    </div>
  );
}
