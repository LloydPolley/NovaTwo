import MusicWrapper from "@/components/Music/EPWrapper";
import AritstHero from "@/components/ArtistHero";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function ArtistProfile({ params }) {
  const { artist, artwork, releases, soundcloud, instagram, spotify } =
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
      <AritstHero
        artist={artist}
        img={artwork}
        uid={params.id}
        soundcloud={soundcloud}
        instagram={instagram}
        spotify={spotify}
      />
      <MusicWrapper releases={releases} />
    </div>
  );
}
