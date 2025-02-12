import Carousel from "../components/Music/Carousel";
import { getAllArtists, getAllArtistsWhere } from "../api/getTracks";
import Hero from "../components/LayoutComps/Hero";
import { getTracksWhere, getAllReleases } from "../api/getTracks";
import Track from "../components/Music/Track";
import UserWidget from "../components/User/UserWidget";
import FilterBar from "../components/LayoutComps/FilterBar";
import AritstHero from "../components/ArtistHero";

export default async function Dj({ searchParams, params }) {
  const users = await getAllArtistsWhere();
  const tracks = await getAllReleases();
  const mixes = await getTracksWhere("mix", true);

  return (
    <>
      {/* <Hero /> */}
      <AritstHero
        title={"Anyma"}
        img={
          "https://djlifemag.com/wp-content/uploads/2023/06/03_ANYMA-PRESS-FULL_HIRES.jpeg"
        }
      />
      <div className="flex flex-col gap-6 mt-5">
        <Carousel
          Component={UserWidget}
          items={users}
          text={"Featured Artists"}
        />
        <Carousel
          Component={Track}
          items={tracks}
          text={"Releases"}
          url={"f=releases"}
          glass="3"
        />
        <Carousel
          Component={Track}
          items={mixes}
          text={"Mixes"}
          url={"f=mix"}
          glass="5"
        />
      </div>
    </>
  );
}
