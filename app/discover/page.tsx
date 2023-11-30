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
  const tracks = await getAllTracksOrdered(order);

  return (
    <>
      {/* <Hero title={"Releases"} anim banner /> */}
      <Wrapper>
        <div className={cx("header")}>
          <h1 className={cx("title")}>Releases.</h1>
          <div className={cx("filters")}>
            <Link href={"?order=desc"}>Recent</Link>
            <Link href={"?order=asc"}>Oldest</Link>
          </div>
        </div>
        <TrackContainer tracks={tracks} />
      </Wrapper>
    </>
  );
}
