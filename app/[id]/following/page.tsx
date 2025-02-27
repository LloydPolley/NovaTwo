import FilterBar from "../../../components/LayoutComps/FilterBar";
import UserFollowing from "../../../components/User/UserFollowing";
import AritstHero from "../../../components/ArtistHero";
import { Suspense } from "react";
import TrackContainer from "../../../components/Music/TrackContainer";

export default async function DjProfile({ params, searchParams }) {
  // const user = await getDj(params?.id);
  // const following = await getUserFollowers(params?.id);

  // console.log("following", following);

  return (
    <div className="rounded flex-grow">
      {/* <AritstHero title={user?.displayName} img={user?.profile} user={user} />
      <div className="">
        {following.map((follow) => (
          <div className="">{follow.displayName}</div>
        ))}
      </div> */}
    </div>
  );
}
