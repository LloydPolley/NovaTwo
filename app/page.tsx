import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { getTracksWhere } from "../api/getTracks";
import SwiperCarousel from "../components/Swiper/SwiperCarousel/SwiperCarousel";
import Hero from "../components/Hero";
import Wrapper from "../components/Wrapper";
import Carousel from "../components/Carousel";
import Link from "next/link";
import HeroText from "../components/HeroText";

const cx = classNames.bind(styles);

export default async function Home() {
  const data = await getTracksWhere("label", "Afterlife");
  const tracks = await getTracksWhere("mix", true);

  return (
    <>
      {/* <Hero title="Higher Power" imgClass="hero__home" /> */}
      <HeroText text="Create, Connect, Collaborate: \nAmplifying the pulse of techno" />
      <Wrapper>
        <div className={cx("carousel-block")}>
          <h3>DJ SET</h3>
          <Carousel data={tracks} />
        </div>
        <div className={cx("carousel-block")}>
          <h3>AFTERLIFE</h3>
          <Carousel data={data} />
        </div>
      </Wrapper>
    </>
  );
}
