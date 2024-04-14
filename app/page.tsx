import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Wrapper from "../components/Wrapper";
import TrackContainerServer from "../components/Tracks/TrackContainer/TrackContainerServer";
import TrackContainerArtist from "../components/Tracks/TrackContainer/TrackContainerArtist";
import FilterBar from "../components/FilterBar";
import Carousel from "../components/Carousel";
import { getAllArtists } from "../api/getTracks";
import Hero from "../components/Hero";
import {
  getAllTracksOrdered,
  getArtistTracks,
  getTracksWhere,
} from "../api/getTracks";
import Track from "../components/Tracks/Track";
import UserWidget from "../components/UserWidget";

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "/" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

export default async function Dj({ searchParams, params }) {
  const users = await getAllArtists();
  const mixes = await getTracksWhere("mix", true);
  const releases = await getTracksWhere("mix", false);

  console.log("users", users);

  return (
    <>
      <Hero />
      <Carousel
        Component={UserWidget}
        items={users}
        text={"Favourite Artists"}
      />
      <Carousel
        Component={Track}
        items={releases}
        text={"Releases"}
        url={"f=release"}
      />
      <Carousel Component={Track} items={mixes} text={"Mixes"} url={"f=mix"} />
    </>
  );
}
