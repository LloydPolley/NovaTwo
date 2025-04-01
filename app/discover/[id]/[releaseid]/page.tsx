import MusicWrapper from "@/components/Music/EPWrapper";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users, releases } from "@/db/schema";
import Link from "next/link";
import AritstHero from "@/components/ArtistHero";
import { ArrowLeft } from "lucide-react";

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

      <div className="pl-5 pt-5">
        <Link href={`/discover/${params.id}`}>
          <ArrowLeft />
        </Link>
      </div>

      <MusicWrapper releases={data.releases} />
    </div>
  );
}
