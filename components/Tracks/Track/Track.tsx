"use client";

import classNames from "classnames/bind";
import style from "./Track.module.scss";
import Play from "../../Buttons/Play";
import Like from "../../Buttons/Like";
import Link from "next/link";
import { useAudioContext } from "../../../context/AudioContext";
import { useLoginContext } from "../../../context/LoginContext";
import { useLikesContext } from "../../../context/LikesContextReducer";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  const [isLiked, setIsLiked] = useState(false);

  const { likes, setNewLike } = useLikesContext();
  const { playContext, pauseContext, isPlaying, trackContext } =
    useAudioContext();
  const { userData } = useLoginContext();

  const isPlayingLocal =
    isPlaying && trackContext?.audioFileLocation === audioFileLocation;

  useEffect(() => {
    const isLikedByUser = likes.find(
      (likedTrack) => likedTrack.trackId === trackId
    );

    setIsLiked(isLikedByUser);
  }, [likes]);

  return (
    <div
      className={cx(
        "track",
        type === "both" ? "track-both" : "track-square",
        isPlayingLocal && "track__playing"
      )}
      key={`${artist} - ${name}`}
      onClick={() => {
        !isPlayingLocal ? playContext(item) : pauseContext();
      }}
    >
      <div className={cx("track__head")}>
        <Image
          src={artworkFileLocation || artwork}
          placeholder="blur"
          blurDataURL={artworkFileLocation || artwork}
          alt={name}
          fill
          // onLoad={() => {
          //   console.log("loaded image", artwork);
          // }}
        />
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
            href={`/${uid}?f=all`}
          >
            {artist}
          </Link>
        )}
        <div className={cx("track__like-container")}>
          {userData?.uid && (
            <Like
              isLikedContext={!!isLiked}
              setNewLike={setNewLike}
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
