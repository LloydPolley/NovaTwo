"use client";

import classNames from "classnames/bind";
import style from "./TrackList.module.scss";
import Play from "../../../Buttons/Play";
import Like from "../../../Buttons/Like";
import Link from "next/link";
import { useAudioContext } from "../../../../context/AudioContext";
import { useLoginContext } from "../../../../context/LoginContext";

const cx = classNames.bind(style);

const TrackRow = ({
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
      className={cx("track-row")}
      key={`${artist} - ${name}`}
      onClick={() => {
        console.log("audio,", audioFileLocation);
        !isPlayingLocal ? playTrack({ url: audioFileLocation }) : pause();
      }}
    >
      <div className={cx("track-row__naming")}>
        <img className={cx("track-row__artwork")} src={artwork} />
        <div className={cx("track-row__text")}>
          <p className={cx("track-row__name")}>{name}</p>
          {artist && (
            <Link
              className={cx("track-row__artist")}
              onClick={(e) => e.stopPropagation()}
              href={`/discover/${uid}/releases`}
            >
              {artist}
            </Link>
          )}
        </div>
      </div>
      <div className={cx("track-row__buttons")}>
        {userData?.uid && (
          <Like
            uid={uid}
            currentUser={userData?.uid}
            trackId={trackId}
            track={{ artist, name, artwork, audioFileLocation, uid, trackId }}
          />
        )}
        <Play isPlayingAudio={isPlayingLocal} />
      </div>
    </div>
  );
};

export default TrackRow;
