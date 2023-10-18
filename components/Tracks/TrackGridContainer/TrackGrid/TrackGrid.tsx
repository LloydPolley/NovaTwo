"use client";

import classNames from "classnames/bind";
import style from "./TrackGrid.module.scss";
import Play from "../../../Buttons/Play";
import Like from "../../../Buttons/Like";
import Link from "next/link";
import { useAudioContext } from "../../../../context/AudioContext";
import { useLoginContext } from "../../../../context/LoginContext";

const cx = classNames.bind(style);

const TrackGrid = ({
  artist,
  name,
  artwork,
  audioFileLocation,
  uid,
  trackId,
}) => {
  const { playTrack, pause, isPlaying, url } = useAudioContext();
  const isPlayingLocal = isPlaying && url === audioFileLocation;
  const { userData } = useLoginContext();

  return (
    <div
      className={cx("track", isPlayingLocal && "track__playing")}
      key={`${artist} - ${name}`}
      onClick={() => {
        !isPlayingLocal ? playTrack({ url: audioFileLocation, name }) : pause();
      }}
    >
      <div className={cx("track__head")}>
        <img className={cx("track__artwork")} src={artwork} />
        <div className={cx("track__play")}>
          <Play isPlayingAudio={isPlayingLocal} />
        </div>
      </div>
      <div className={cx("track__text")}>
        <p className={cx("track__name")}>{name}</p>
        {artist && (
          <Link
            className={cx("track__artist")}
            onClick={(e) => e.stopPropagation()}
            href={`/discover/${uid}`}
          >
            {artist}
          </Link>
        )}
        <div className={cx("track__like-container")}>
          {userData?.uid && (
            <Like
              uid={uid}
              currentUser={userData?.uid}
              trackId={trackId}
              track={{ artist, name, artwork, audioFileLocation, uid, trackId }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackGrid;
