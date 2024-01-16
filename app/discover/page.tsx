import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import { getTracksWhere, getAllTracksOrdered } from "../../api/getTracks";
import Wrapper from "../../components/Wrapper";
import Hero from "../../components/Hero";
import TrackContainer from "../../components/Tracks/TrackContainer";
import Link from "next/link";
import HeroText from "../../components/HeroText";
import FilterBar from "../../components/FilterBar";

const cx = classNames.bind(styles);

export default async function Dj({ searchParams }) {
  const { order } = searchParams;
  const tracks = await getAllTracksOrdered(order);

  return (
    <>
      {/* <Hero title={"Releases"} anim banner /> */}
      <HeroText text={"Releases"} />
      <Wrapper>
        <FilterBar />
        <TrackContainer tracks={tracks} />
      </Wrapper>
    </>
  );
}
