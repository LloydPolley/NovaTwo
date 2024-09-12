"use client";

import classNames from "classnames/bind";
import style from "./Track.module.scss";
import Play from "../../Buttons/Play";
import Like from "../../Buttons/Like";
import Link from "next/link";
import useAudioStore from "../../../context/AudioStore";
import Image from "next/image";
import useAuthStore from "../../../context/AuthStore";

const cx = classNames.bind(style);

const Track = ({ item, type }) => {
  const {
    artist,
    artworkFileLocation,
    audioFileLocation,
    uid,
    name,
    trackId,
    artwork,
  } = item || {};

  const { isPlaying, trackContext, playContext, pauseContext } = useAudioStore(
    (state) => state
  );

  const { userData } = useAuthStore((state) => state);

  const isPlayingLocal =
    isPlaying && trackContext?.audioFileLocation === audioFileLocation;

  return (
    <div
      className={cx(
        "track",
        type === "both" ? "track-both" : "track-square",
        isPlayingLocal && "track__playing"
      )}
      key={`${artist} - ${name}`}
      onClick={() => {
        if (audioFileLocation) {
          !isPlayingLocal ? playContext(item) : pauseContext();
        }
      }}
    >
      <div className={cx("track__head")}>
        <Link
          onClick={(e) => e.stopPropagation()}
          href={`/${uid}?f=all&name=${name}`}
        >
          <Image
            src={artworkFileLocation || artwork}
            placeholder="blur"
            blurDataURL={artworkFileLocation || artwork}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
          {audioFileLocation && (
            <div className={cx("track__play")}>
              <Play isPlayingAudio={isPlayingLocal} />
            </div>
          )}
        </Link>
      </div>
      <div className={cx("track__text")}>
        <p className={cx("track__name")}>{name}</p>
        {artist && (
          <Link
            className={cx("track__artist")}
            onClick={(e) => e.stopPropagation()}
            href={`/${uid}?f=all`}
          >
            {artist}
          </Link>
        )}
        <div className={cx("track__like-container")}>
          {userData?.uid && (
            <Like
              track={{
                artist,
                name,
                artwork: artwork || artworkFileLocation,
                audioFileLocation,
                uid,
                trackId,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;
