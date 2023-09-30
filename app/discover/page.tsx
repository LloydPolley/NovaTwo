import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackSquare from "../../components/Tracks/TrackSquare";
import TrackRow from "../../components/Tracks/TrackListContainer/TrackList";
import Hero from "../../components/Hero";

import { getAllTracks, getTracksWhere } from "../../api/getTracks";
import SwiperCarousel from "../../components/Swiper/SwiperCarousel/SwiperCarousel";
import TracksWrapper from "../../components/Tracks/TracksWrapper";

const cx = classNames.bind(styles);

export default async function Dj() {
  const data = await getAllTracks();
  const tracks = await getTracksWhere("featured", true);

  // console.log("tracks", tracks);

  return (
    <div className={cx("dj-page")}>
      <div className={cx("tracks")}>
        <h3 className={cx("tracks__featured")}>RECENT</h3>
        <TracksWrapper tracks={data} />
      </div>
    </div>
  );
}
