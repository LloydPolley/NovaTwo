import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackSquare from "../../components/Tracks/TrackSquare";
import TrackRow from "../../components/Tracks/TrackListContainer/TrackList";
import Hero from "../../components/Hero";

import { getAllTracks, getTracksWhere } from "../../api/getTracks";
import SwiperCarousel from "../../components/Swiper/SwiperCarousel/SwiperCarousel";
import TracksWrapper from "../../components/Tracks/TracksWrapper";
import FilterBar from "../../components/FilterBar";

const cx = classNames.bind(styles);

export default async function Dj({ searchParams }) {
  const { t } = searchParams;
  console.log("tracks", t);
  const data = await getTracksWhere("label", t || "recent");

  return (
    <div className={cx("dj-page")}>
      <div className={cx("tracks")}>
        {/* <FilterBar
          filters={["recent", "afterlife", "upperground"]}
          searchParams={searchParams}
        /> */}
        <TracksWrapper tracks={data} />
      </div>
    </div>
  );
}
