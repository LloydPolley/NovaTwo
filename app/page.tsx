import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import Carousel from "../components/Carousel";
import { getAllArtists } from "../api/getTracks";
import Hero from "../components/Hero";
import { getTracksWhere } from "../api/getTracks";
import Track from "../components/Tracks/Track";
import UserWidget from "../components/UserWidget";

const cx = classNames.bind(styles);

export default async function Dj({ searchParams, params }) {
  const users = await getAllArtists();
  const tracks = await getTracksWhere("mix", false);
  const mixes = await getTracksWhere("mix", true);

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
        items={tracks}
        text={"Releases"}
        url={"f=tracks"}
      />
      <Carousel Component={Track} items={mixes} text={"Mixes"} url={"f=mix"} />
    </>
  );
}
