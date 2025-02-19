import Carousel from "../components/Music/Carousel";
import { getAllArtists } from "../api/getTracks";
import Hero from "../components/LayoutComps/Hero";
import { getTracksWhere, getAllReleases } from "../api/getTracks";
import Track from "../components/Music/Track";
import UserWidget from "../components/User/UserWidget";

export default async function Dj() {
  const users = await getAllArtists();
  const tracks = await getAllReleases();
  const mixes = await getTracksWhere("mix", true);

  return (
    <>
      <Hero />
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
