"use client";

import classNames from "classnames/bind";
import style from "./Track.module.scss";
import Play from "../../Buttons/Play";
import Like from "../../Buttons/Like";
import Link from "next/link";
import { useAudioContext } from "../../../context/AudioContext";
import { useLoginContext } from "../../../context/LoginContext";
import Image from "next/image";

const cx = classNames.bind(style);

const Track = ({ track }) => {
  const {
    artist,
    artworkFileLocation,
    audioFileLocation,
    uid,
    name,
    trackId,
    artwork,
  } = track;

  // console.log("track", track);

  const { playContext, pauseContext, isPlaying, trackContext } =
    useAudioContext();
  const isPlayingLocal =
    isPlaying && trackContext?.audioFileLocation === audioFileLocation;
  const { userData } = useLoginContext();

  return (
    <div
      className={cx("track", isPlayingLocal && "track__playing")}
      key={`${artist} - ${name}`}
      onClick={() => {
        !isPlayingLocal ? playContext(track) : pauseContext();
      }}
    >
      <div className={cx("track__head")}>
        <Image
          src={artworkFileLocation || artwork}
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAKBueIx4ZKCMgoy0qqC+8P//8Nzc8P//////////////////////////////////////////////////////////2wBDAaq0tPDS8P//////////////////////////////////////////////////////////////////////////////wAARCAADAAMDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAXEAEBAQEAAAAAAAAAAAAAAAAAARJR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJmcgAL/2Q=="
          }
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
            href={`/discover/${uid}/releases`}
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
