import Carousel from "../components/Music/Carousel";
import Hero from "../components/LayoutComps/Hero";
import Track from "../components/Music/Track";
import UserWidget from "../components/User/UserWidget";
import { db } from "@/db/drizzle";

export default async function Dj() {
  const users = await db.query.users.findMany({});
  const tracks = await db.query.releases.findMany({});

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
        {/* <Carousel
          Component={Track}
          items={mixes}
          text={"Mixes"}
          url={"f=mix"}
          glass="5"
        /> */}
      </div>
    </>
  );
}
