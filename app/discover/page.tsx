import Carousel from "../../components/Music/Carousel";
import Track from "../../components/Music/Track";
import UserWidget from "../../components/User/UserWidget";
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

  const releasesData = await db
    .select({
      id: releases.id,
      title: releases.title,
      artwork: releases.artwork,
      uid: releases.uid,
      artist: users.artist,
    })
    .from(releases)
    .leftJoin(users, eq(releases.uid, users.id));

  const mixData = await db
    .select({
      id: tracks.id,
      title: tracks.title,
      audio: tracks.audio,
      uid: tracks.uid,
      mix: tracks.mix,
      artist: users.artist,
      artwork: releases.artwork,
    })
    .from(tracks)
    .where(eq(tracks.mix, true))
    .leftJoin(users, eq(tracks.uid, users.id))
    .leftJoin(releases, eq(tracks.releaseId, releases.id));

  return (
    <>
      <Header title="Overview" />
      <div className="flex flex-col mt-5">
        <Carousel
          Component={UserWidget}
          items={usersData}
          text={"Featured Artists"}
        />
        <Carousel
          Component={Track}
          items={releasesData}
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
