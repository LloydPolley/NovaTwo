import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Wrapper from "../components/Wrapper";
import TrackContainer from "../components/Tracks/TrackContainer";
import FilterBar from "../components/FilterBar";
import Carousel from "../components/Carousel";
import { getAllArtists } from "../api/getTracks";

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "/" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

export default async function Dj({ searchParams, params }) {
  const users = await getAllArtists();

  return (
    <>
      <div className={cx("home")}>
        <Carousel users={users} searchParams={searchParams} hp />
      </div>

      <Wrapper>
        <FilterBar searchParams={searchParams} filters={filters} />
        <TrackContainer searchParams={searchParams} params={params} />
      </Wrapper>
    </>
  );
}
