"use client";

import Link from "next/link";
import useAudioStore from "../../../context/AudioStore";
import Image from "next/image";
import useAuthStore from "../../../context/AuthStore";
import Like from "@/components/LayoutComps/Buttons/Like";

const Track = ({ item }) => {
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
      className=""
      key={`${artist} - ${name}`}
      onClick={() => {
        if (audioFileLocation) {
          !isPlayingLocal ? playContext(item) : pauseContext();
        }
      }}
    >
      <div className="relative w-full aspect-square">
        <Link
          className="shadow-lg"
          onClick={(e) => {
            audioFileLocation ? e.preventDefault() : e.stopPropagation();
          }}
          href={audioFileLocation ? "#" : `/${uid}?f=all&name=${name}`}
        >
          <Image
            className="rounded-3xl"
            src={artworkFileLocation || artwork}
            placeholder="blur"
            blurDataURL={artworkFileLocation || artwork}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
      <div className="pt-2 relative w-11/12 m-auto">
        <p className="text-lg">{name}</p>
        <Link
          className="text-widgetBlack-400 text-sm"
          onClick={(e) => e.stopPropagation()}
          href={`/${uid}`}
        >
          {artist}
        </Link>
        {userData?.uid && audioFileLocation && (
          <div className="absolute right-2 top-4">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
