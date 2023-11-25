import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import { getTracksWhere, getAllTracksOrdered } from "../../api/getTracks";
import Wrapper from "../../components/Wrapper";
import Hero from "../../components/Hero";
import TrackContainer from "../../components/Tracks/TrackContainer";
import Link from "next/link";

const cx = classNames.bind(styles);

export default async function Dj({ searchParams }) {
  const { order } = searchParams;
  // const tracks = await getTracksWhere("label", t || "recent");
  const tracks = await getAllTracksOrdered(order);

  console.log("order", order);

  return (
    <>
      {/* <Hero title={"Releases"} anim banner /> */}
      <Wrapper>
        <h1 className={cx("title")}>Releases.</h1>
        <Link href={"?order=asc"}>Acs</Link>
        <Link href={"?order=desc"}>Desc</Link>
        <TrackContainer tracks={tracks} />
      </Wrapper>
    </>
  );
}
