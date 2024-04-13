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

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "/" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

export default async function Dj({ searchParams, params }) {
  const users = await getAllArtists();
  const mixes = await getTracksWhere("mix", false);
  const releases = await getTracksWhere("mix", true);

  return (
    <>
      <Hero />
      <TrackContainerArtist text={"Mixes"} users={users} url={"f=mix"} />
      <TrackContainerServer text={"Mixes"} tracks={mixes} url={"f=mix"} />
      <TrackContainerServer
        text={"Releases"}
        tracks={releases}
        url={"f=tracks"}
      />
    </>
  );
}
