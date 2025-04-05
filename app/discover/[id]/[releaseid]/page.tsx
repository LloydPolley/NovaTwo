import MusicWrapper from "@/components/Music/EPWrapper";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users, releases } from "@/db/schema";
import Link from "next/link";
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
      <div className="pl-5 pt-5 sticky top-0 z-10">
        <Link className="flex flex-row gap-5" href={`/discover/${params.id}`}>
          <ArrowLeft className="size-8 my-auto" />
          <h1 className="text-4xl lg:text-6xl font-bold">{data.artist}</h1>
        </Link>
      </div>

      <MusicWrapper releases={data.releases} />
    </div>
  );
}
