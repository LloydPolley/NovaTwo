import MusicWrapper from "../../components/Music/EPWrapper";
import AritstHero from "../../components/ArtistHero";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function ArtistProfile({ params }) {
  const { artist, profile, releases } =
    (await db.query.users.findFirst({
      where: eq(users.id, params?.id),
      with: {
        releases: {
          with: {
            tracks: true,
          },
        },
        tracks: true,
      },
    })) ?? {};

  return (
    <div className="rounded flex-grow">
      <AritstHero title={artist} img={profile} />
      <MusicWrapper releases={releases} />
    </div>
  );
}
