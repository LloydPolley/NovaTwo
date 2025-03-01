import Carousel from "../components/Music/Carousel";
import Hero from "../components/LayoutComps/Hero";
import Track from "../components/Music/Track";
import UserWidget from "../components/User/UserWidget";
import { db } from "@/db/drizzle";
import { tracks } from "@/db/schema";
import { eq } from "drizzle-orm";
import Header from "@/components/Header/Header";

export default async function Dj() {
  const usersData = await db.query.users.findMany({});
  const tracksData = await db.query.releases.findMany({});
  const mixData = await db.query.tracks.findMany({
    where: eq(tracks.mix, true),
  });

  return (
    <>
      <Header title="Dashboard" />
      <div className="flex flex-col gap-6 mt-5">
        <Carousel
          Component={UserWidget}
          items={usersData}
          text={"Featured Artists"}
        />
        <Carousel
          Component={Track}
          items={tracksData}
          text={"Releases"}
          url={"f=releases"}
        />
        <Carousel
          Component={Track}
          items={mixData}
          text={"Mixes"}
          url={"f=mix"}
        />
      </div>
    </>
  );
}
