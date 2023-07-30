"use client";

import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../api/getDjs";
import { getArtistTracks, getAllLikedTracks } from "../../../api/getTracks";
import TrackRow from "../../../components/Track/TrackRow/TrackRow";
import { usePathname } from "next/navigation";
import Edit from "../../../components/Icons/Edit";
import PlayIcon from "../../../components/Icons/PlayIcon";
import TrackList from "../../../components/TrackList";

const cx = classNames.bind(styles);

export default async function DjProfile({ params }) {
  const user = await getDj(params?.id);
  const tracks = await getArtistTracks(params?.id);

  console.log("params", params);

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

      <div className={cx("artist__tracks")}>
        <h2>TRACKS</h2>
        <div className={cx("artist__track-list")}>
          {tracks?.map((track) => (
            <TrackRow
              key={track.name}
              name={track.name}
              artist={track.artist}
              audioFileLocation={track.audioFileLocation}
              artwork={track.artworkFileLocation}
              uid={track.uid}
              trackId={track.trackId}
            />
          ))}
        </div>
        <h2>Likes</h2>
        <TrackList />
      </div>
    </div>
  );
}
