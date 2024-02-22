import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { getTracksWhere, getAllTracksOrdered } from "../api/getTracks";
import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import TrackContainer from "../components/Tracks/TrackContainer";
import Link from "next/link";
import HeroText from "../components/HeroText";
import FilterBar from "../components/FilterBar";
import Carousel from "../components/Carousel";

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "?f=all" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

export default async function Dj({ searchParams }) {
  const { order } = searchParams;

  let tracks;

  switch (searchParams.f) {
    case "tracks":
      tracks = await getTracksWhere("mix", false);
      break;
    case "mix":
      tracks = await getTracksWhere("mix", true);
      break;
    default:
      tracks = await getAllTracksOrdered(order);
      break;
  }

  return (
    <>
      {/* <Hero title={"Releases"} anim banner /> */}
      {/* <Hero title={"Featured"} /> */}
      <div className={cx("hero")}>
        <a href="/6YcUr8HaITZEw3OBKc220qPpx2E2">
          <div className={cx("hero__widget")}>
            <div className={cx("hero__text")}>
              <p>The Feeling</p>
              <p>Massano</p>
            </div>
          </div>
        </a>
      </div>
      <Wrapper>
        <FilterBar searchParams={searchParams} filters={filters} />
        <TrackContainer tracks={tracks} />
      </Wrapper>
    </>
  );
}
