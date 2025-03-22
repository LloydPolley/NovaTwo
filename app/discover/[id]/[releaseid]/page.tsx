import MusicWrapper from "@/components/Music/EPWrapper";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users, releases } from "@/db/schema";
import Link from "next/link";
import AritstHero from "@/components/ArtistHero";

export default async function ArtistProfile({ params }) {
  const data = await db.query.users.findFirst({
    where: eq(users.id, params?.id),
    with: {
      releases: {
        where: eq(releases.id, params?.releaseid),
        with: {
          tracks: true,
        },
      },
    },
  });

  return (
    <div className="rounded flex-grow">
      <AritstHero title={data.artist} img={data.artwork} uid={params.id} />
      <Link href={`/discover/${params.id}`}>Back</Link>
      <MusicWrapper releases={data.releases} />
    </div>
  );
}
