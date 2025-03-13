import Carousel from "../components/Music/Carousel";
import Track from "../components/Music/Track";
import UserWidget from "../components/User/UserWidget";
import { db } from "@/db/drizzle";
import { tracks, users, releases } from "@/db/schema";
import { eq } from "drizzle-orm";
import Header from "@/components/Header/Header";

export default async function Dj() {
  const usersData = await db
    .select({
      id: users.id,
      artist: users.artist,
      email: users.email,
      artwork: users.artwork,
      createdAt: users.createdAt,
    })
    .from(users);

  const tracksData = await db
    .select({
      id: releases.id,
      title: releases.title,
      artwork: releases.artwork,
      uid: releases.uid,
    })
    .from(releases);

  const mixData = await db
    .select({
      id: tracks.id,
      artist: tracks.artist,
      title: tracks.title,
      artwork: tracks.artwork,
      audio: tracks.audio,
      uid: tracks.uid,
      mix: tracks.mix,
    })
    .from(tracks)
    .where(eq(tracks.mix, true));

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
