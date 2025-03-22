import TrackContainer from "@/components/Music/TrackContainer";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { releases, users } from "@/db/schema";
import Header from "@/components/Header/Header";

export default async function Releases() {
  const items = await db
    .select({
      id: releases.id,
      title: releases.title,
      artwork: releases.artwork,
      uid: releases.uid,
      artist: users.artist,
    })
    .from(releases)
    .leftJoin(users, eq(releases.uid, users.id));

  return (
    <div className="flex-1">
      <Header title={"Releases"} />
      <TrackContainer tracks={items} />
    </div>
  );
}
