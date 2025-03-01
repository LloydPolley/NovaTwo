import MusicWrapper from "../../components/Music/EPWrapper";
import AritstHero from "../../components/ArtistHero";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function ArtistProfile({ params }) {
  const { artist, artwork, releases } =
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
      <AritstHero title={artist} img={artwork} uid={params.id} />
      <MusicWrapper releases={releases} />
    </div>
  );
}
