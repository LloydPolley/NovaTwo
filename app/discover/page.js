import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackSquare from "../../components/Track/TrackSquare";
import TrackRow from "../../components/Track/TrackRow";
import Hero from "../../components/Hero";

import { getAllTracks, getTracksWhere } from "../../api/getTracks";
import TrackList from "../../components/TrackList/TrackList";
import SwiperCarousel from "../../components/Swiper/SwiperCarousel/SwiperCarousel";

const cx = classNames.bind(styles);

export default async function Dj() {
  const data = await getAllTracks();
  const tracks = await getTracksWhere("featured", true);

  // console.log("tracks", tracks);

  return (
    <div className={cx("dj-page")}>
      {/* <Hero title="DISCOVER" imgClass="hero__discover" /> */}
      <div className={cx("tracks")}>
        <h3 className={cx("tracks__featured")}>FEATURED</h3>
        {tracks && <SwiperCarousel data={tracks} />}
        <h3 className={cx("tracks__featured")}>RECENT</h3>
        <TrackList tracks={data} />
      </div>
    </div>
  );
}
