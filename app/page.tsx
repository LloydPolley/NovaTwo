import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { getTracksWhere, getAllTracks } from "../api/getTracks";
import SwiperCarousel from "../components/Swiper/SwiperCarousel/SwiperCarousel";
import Hero from "../components/Hero";
import TrackSquare from "../components/Tracks/TrackSquare";
import Link from "next/link";
import RightArrow from "../components/Icons/RightArrow";
import discover from "../imgs/discover.png";
import Wrapper from "../components/Wrapper";

const cx = classNames.bind(styles);

export default async function Home() {
  const data = await getTracksWhere("label", "afterlife");
  const tracks = await getTracksWhere("featured", true);

  return (
    <>
      <Hero title="GENESYS" imgClass="hero__home" />
      <Wrapper>
        <div className={cx("label-carousel")}>
          <h3>AFTERLIFE</h3>
          <div className={cx("label-carousel__box")}>
            {data && <SwiperCarousel data={data} />}
          </div>
        </div>
        <div className={cx("label-carousel")}>
          <h3>FEATURED</h3>
          <div className={cx("label-carousel__box")}>
            {data && <SwiperCarousel data={tracks} />}
          </div>
        </div>
      </Wrapper>
    </>
  );
}
