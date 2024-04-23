import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackContainer from "../../components/Tracks/TrackContainer";
import Carousel from "../../components/Carousel";
import { getAllArtists } from "../../api/getTracks";
import Hero from "../../components/Hero";
import {
  getAllTracksOrdered,
  getArtistTracks,
  getTracksWhere,
} from "../../api/getTracks";
import FilterBar from "../../components/FilterBar";
import { Suspense } from "react";
import AritstHero from "../../components/ArtistHero";

const cx = classNames.bind(styles);

const filters = [
  { label: "All", url: "?f=all" },
  { label: "Tracks", url: "?f=tracks" },
  { label: "Mix", url: "?f=mix" },
];

const setImg = "./1.jpg";
const djImg = "./2.jpg";
const allImg = "./3.jpg";

const mix = "Live Mixes";
const releases = "Releases";
const all = "All";

export default async function Dj({ searchParams, params }) {
  const filterType = searchParams.f;

  let tracks = [];
  let img;
  let text;

  if (filterType === "tracks") {
    tracks = await getTracksWhere("mix", false);
    img = djImg;
    text = releases;
  } else if (filterType === "mix") {
    tracks = await getTracksWhere("mix", true);
    img = setImg;
    text = mix;
  } else if (filterType === "all") {
    tracks = await getAllTracksOrdered("asc");
    img = allImg;
    text = all;
  }

  return (
    <>
      <AritstHero title={text} img={img} user={{}} overlay />
      <FilterBar searchParams={searchParams} filters={filters} />
      <Suspense>
        <TrackContainer
          trackList={tracks}
          searchParams={searchParams}
          params={params}
          url={undefined}
        />
      </Suspense>
    </>
  );
}
