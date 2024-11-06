import { getDj } from "../../../api/getDjs";
import AritstHero from "../../../components/ArtistHero";
import LikesContainer from "../../../components/LikesContainer/LikesContainer";
import getUserLikes from "../../../api/likes/getUserLikes";
import { revalidatePath } from "next/cache";

export default async function likes({ params }) {
  const user = await getDj(params?.id);
  const likes = await getUserLikes(params?.id);

  revalidatePath("/", "page");

  console.log("likes", likes);

  return (
    <div className="rounded flex-grow">
      <AritstHero title={user?.displayName} img={user?.profile} user={user} />
      <LikesContainer
        // trackFetch={getUserLikes}
        uid={params?.id}
        likes={likes}
      />
    </div>
  );
}
