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

const cx = classNames.bind(styles);

export default async function DjProfile({ params }) {
  const user = await getDj(params?.id);
  const likes = await getAllLikedTracks(params?.id);
  const tracks = await getArtistTracks(params?.id);

  return (
    <div className={cx("artist")}>
      <div
        className={cx("artist__hero")}
        style={{
          backgroundImage: `url(${user?.background})`,
        }}
      >
        <div className={cx("artist__hero-overlay")} />
        <div className={cx("artist__profile")}>
          <div className={cx("artist__profile-container-img")}>
            <Image
              className={cx("artist__profile-img")}
              src={user?.profile}
              // width={200}
              // height={200}
              fill={true}
              // objectFit={"contain"}
              alt="Picture of the author"
            />
          </div>

          <div className={cx("artist__profile-info")}>
            <div>
              <h1>{user?.displayName}</h1>
              <button className={cx("cta")}>
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>
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
        <div className={cx("artist__track-list")}>
          {likes?.map((track) => (
            <TrackRow
              key={track.name}
              name={track.name}
              artist={track.artist}
              audioFileLocation={track.audioFileLocation}
              artwork={track.artwork}
              uid={track.uid}
              trackId={track.trackId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
