import Carousel from "../components/Carousel";
import { getAllArtists, getAllArtistsWhere } from "../api/getTracks";
import Hero from "../components/Hero";
import { getTracksWhere, getAllReleases } from "../api/getTracks";
import Track from "../components/Tracks/Track";
import UserWidget from "../components/UserWidget";

export default async function Dj({ searchParams, params }) {
  const users = await getAllArtistsWhere();
  const tracks = await getAllReleases();
  const mixes = await getTracksWhere("mix", true);

  return (
    <>
      <Hero />
      {/* {/* <Carousel
        Component={UserWidget}
        items={users}
        text={"Favourite Artists"}
      /> */}
      <Carousel
        Component={Track}
        items={tracks}
        text={"Releases"}
        url={"f=releases"}
      />
      {/* <Carousel Component={Track} items={mixes} text={"Mixes"} url={"f=mix"} /> */}
    </>
  );
}
