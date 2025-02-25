import MusicWrapper from "../../components/Music/EPWrapper";
import UserFollowing from "../../components/User/UserFollowing";
import { getDj } from "../../api/getDjs";
import AritstHero from "../../components/ArtistHero";
import { getArtistTracks, getArtistReleases } from "../../api/getTracks";

export default async function DjProfile({ params, searchParams }) {
  const user = await getDj(params?.id);
  const releases = await getArtistReleases(params?.id);
  const tracks = await getArtistTracks(params?.id);

  return (
    <div className="rounded flex-grow">
      <AritstHero title={user?.displayName} img={user?.profile} user={user} />
      <UserFollowing searchParams={searchParams} params={params} />
      <MusicWrapper
        searchParams={searchParams}
        trackList={tracks}
        releaseList={releases}
      />
    </div>
  );
}
