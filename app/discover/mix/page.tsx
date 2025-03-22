import TrackContainer from "@/components/Music/TrackContainer";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { tracks } from "@/db/schema";
import Header from "@/components/Header/Header";
import { releases, users } from "@/db/schema";

export default async function Mix() {
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

  console.log("mixData", mixData);

  return (
    <div className="flex-1">
      <Header title={"Live Mixes"} />
      <TrackContainer tracks={mixData} />
    </div>
  );
}
