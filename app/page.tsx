import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Wrapper from "../components/Wrapper";
import TrackContainer from "../components/Tracks/TrackContainer";
import FilterBar from "../components/FilterBar";
import Carousel from "../components/Carousel";

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "/" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

export default async function Dj({ searchParams, params }) {
  return (
    <>
      <div className={cx("artist-container")}>
        <h1>Artists</h1>
        <Carousel data={["", "", "", "", "", "", "", "", ""]} />
      </div>

      <Wrapper>
        <FilterBar searchParams={searchParams} filters={filters} />
        <TrackContainer searchParams={searchParams} params={params} />
      </Wrapper>
    </>
  );
}
