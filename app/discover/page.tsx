import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackSquare from "../../components/Tracks/TrackSquare";
import TrackRow from "../../components/Tracks/TrackListContainer/TrackList";

import { getAllTracks, getTracksWhere } from "../../api/getTracks";
import SwiperCarousel from "../../components/Swiper/SwiperCarousel/SwiperCarousel";
import TracksWrapper from "../../components/Tracks/TracksWrapper";
import FilterBar from "../../components/FilterBar";
import Wrapper from "../../components/Wrapper";
import Hero from "../../components/Hero";

const cx = classNames.bind(styles);

export default async function Dj({ searchParams }) {
  const { t } = searchParams;
  const data = await getTracksWhere("label", t || "recent");

  return (
    <>
      <Hero title={"Discover"} img={"/discovery.jpg"} />
      <Wrapper>
        <TracksWrapper tracks={data} />
      </Wrapper>
    </>
  );
}
