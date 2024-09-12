import classNames from "classnames/bind";
import TrackContainer from "../../components/TracksV2/TrackContainer";
import FilterBar from "../../components/FilterBar";
import Carousel from "../../components/Carousel";
import { getUserFollowers } from "../../api/addFollower";
import UserFollowing from "../../components/UserFollowing";
import { getDj } from "../../api/getDjs";
import AritstHero from "../../components/ArtistHero";
import { Suspense } from "react";
import styles from "./artist.module.scss";

const filters = [
  { label: "All", url: "?f=all" },
  { label: "Tracks", url: "?f=releases" },
  { label: "Mix", url: "?f=mix" },
  { label: "Likes", url: "?f=likes" },
  { label: "Following", url: "?f=following" },
];

const cx = classNames.bind(styles);

export default async function DjProfile({ params, searchParams }) {
  const user = await getDj(params?.id);

  return (
    <div className={cx("artist")}>
      <AritstHero title={user?.displayName} img={user?.profile} user={user} />
      <FilterBar searchParams={searchParams} filters={filters} />
      <UserFollowing searchParams={searchParams} params={params} />
      <Suspense>
        <TrackContainer
          searchParams={searchParams}
          params={params}
          text={undefined}
          trackList={undefined}
          url={undefined}
        />
      </Suspense>
    </div>
  );
}
