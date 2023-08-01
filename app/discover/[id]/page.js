import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../api/getDjs";
import { getArtistTracks, getAllLikedTracks } from "../../../api/getTracks";
import TrackListContainer from "../../../components/TrackListContainer";
import { cookies } from "next/headers";

const cx = classNames.bind(styles);

export default async function DjProfile({ params }) {
  const uid = cookies().get("uid")?.value;
  const likes = await getAllLikedTracks(uid);
  const user = await getDj(params?.id);
  const tracks = await getArtistTracks(params?.id);

  return (
    <div className={cx("artist")}>
      <div className={cx("artist__hero")}>
        <Image
          className={cx("artist__img")}
          src={user?.profile}
          width={250}
          height={250}
          // fill={true}
          objectFit={"contain"}
          alt="Picture of the author"
        />
        <h1>{user?.displayName}</h1>
      </div>
      {/* {isProfile && <Edit />} */}
      <TrackListContainer
        uid={uid}
        tracks={tracks}
        likes={likes}
        params={params}
      />
    </div>
  );
}
