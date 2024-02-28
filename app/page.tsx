import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { getTracksWhere, getAllTracksOrdered } from "../api/getTracks";
import Wrapper from "../components/Wrapper";
import TrackContainer from "../components/Tracks/TrackContainer";
import FilterBar from "../components/FilterBar";

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
      <div className={cx("hero")}>
        <div className={cx("hero__widget")}>
          <video autoPlay muted loop>
            <source src="/home-short.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <Wrapper>
        <FilterBar searchParams={searchParams} filters={filters} />
        <TrackContainer tracks={tracks} />
      </Wrapper>
    </>
  );
}
