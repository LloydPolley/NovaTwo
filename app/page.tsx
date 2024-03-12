import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Wrapper from "../components/Wrapper";
import TrackContainer from "../components/Tracks/TrackContainer";
import FilterBar from "../components/FilterBar";

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "/" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

export default async function Dj({ searchParams, params }) {
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
        <TrackContainer searchParams={searchParams} params={params} />
      </Wrapper>
    </>
  );
}
