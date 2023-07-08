import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import TrackSquare from "../components/Track/TrackSquare";
import { getLabelTracks } from "../api/getTracks";
import SwiperCarousel from "../components/Swiper/SwiperCarousel/SwiperCarousel";

const cx = classNames.bind(styles);

export default async function Home() {
  const data = await getLabelTracks("afterlife");

  return (
    <div className={cx("home")}>
      {/* <SwiperHero /> */}
      <div className={cx("home__hero")}>
        <div className={cx("home__hero-box")}>
          <h1>DISCOVER</h1>
        </div>
        <div className={cx("home__hero-box")}>
          <h1>CREATE</h1>
        </div>
      </div>
      <div className={cx("label-carousel")}>
        <h3>AFTERLIFE</h3>
        <div className={cx("label-carousel__box")}>
          {data && <SwiperCarousel data={data} />}
        </div>
      </div>
    </div>
  );
}
