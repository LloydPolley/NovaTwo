"use client";

import Play from "../../Buttons/Play";
import Like from "../../Buttons/Like";
import Link from "next/link";
import useAudioStore from "../../../context/AudioStore";
import Image from "next/image";
import useAuthStore from "../../../context/AuthStore";

const Track = ({ item, index }) => {
  const {
    artist,
    artworkFileLocation,
    audioFileLocation,
    uid,
    name,
    trackId,
    artwork,
    mix,
    duration,
  } = item || {};

  const { isPlaying, trackContext, playContext, pauseContext } = useAudioStore(
    (state) => state
  );

  const { userData } = useAuthStore((state) => state);

  const isPlayingLocal =
    isPlaying && trackContext?.audioFileLocation === audioFileLocation;

  return (
    <div
      className="flex w-full p-2 justify-between items-center rounded-lg hover:bg-stone-900"
      key={`${artist} - ${name}`}
      onClick={() => {
        playContext(item);
      }}
    >
      <div className="flex items-center space-x-4">
        <p className="w-10 text-center">{index + 1}</p>
        <div className="flex-grow">
          <p className="font-medium">{name}</p>
          {artist && (
            <Link
              className="text-gray-400 hover:underline"
              onClick={(e) => e.stopPropagation()}
              href={`/${uid}?f=all`}
            >
              {artist}
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 basis-1/4 justify-between">
        <p className="text-sm">{mix ? "Mix" : "Track"}</p>
        <p className="text-sm">{duration}</p>
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
  );
};

export default Track;
