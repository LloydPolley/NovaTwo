import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import { getTracksWhere } from "../../api/getTracks";
import Wrapper from "../../components/Wrapper";
import Hero from "../../components/Hero";
import TrackContainer from "../../components/Tracks/TrackContainer";

const cx = classNames.bind(styles);

export default async function Dj({ searchParams }) {
  const { t } = searchParams;
  const tracks = await getTracksWhere("label", t || "recent");

  return (
    <>
      <Hero title={"Discover"} img="/discover-bg.webp" anim banner />
      <Wrapper>
        <TrackContainer tracks={tracks} />
      </Wrapper>
    </>
  );
}