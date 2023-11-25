import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { getTracksWhere } from "../api/getTracks";
import SwiperCarousel from "../components/Swiper/SwiperCarousel/SwiperCarousel";
import Hero from "../components/Hero";
import Wrapper from "../components/Wrapper";
import Carousel from "../components/Carousel";

const cx = classNames.bind(styles);

export default async function Home() {
  const data = await getTracksWhere("label", "Afterlife");
  const tracks = await getTracksWhere("featured", true);

  console.log("get", data);

  return (
    <>
      <Hero title="Higher Power" imgClass="hero__home" />
      <Wrapper>
        <div className={cx("carousel-block")}>
          <h3>AFTERLIFE</h3>
          <Carousel data={data} />
        </div>
        <div className={cx("carousel-block")}>
          <h3>FEATURED</h3>
          <Carousel data={tracks} />
        </div>
      </Wrapper>
    </>
  );
}
