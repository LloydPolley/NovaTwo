"use client";

import Play from "../../LayoutComps/Buttons/Play";
import Like from "../../LayoutComps/Buttons/Like";
import Link from "next/link";
import useAudioStore from "../../../context/AudioStore";
import Image from "next/image";
import useAuthStore from "../../../context/AuthStore";
import MixIcon from "@/components/Icons/MixIcon";
import TracksIcon from "@/components/Icons/TracksIcon";

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
      className="flex w-full p-2 justify-between items-center rounded-lg hover:bg-widgetBlack-600 cursor-pointer"
      key={`${artist} - ${name}`}
      onClick={() => playContext(item)}
    >
      <div className="flex items-center space-x-4 basis-3/4">
        <p className="w-10 text-center">{index + 1}</p>
        <p className="font-medium truncate w-32 md:w-60">{name}</p>
      </div>

      <div className="flex items-center space-x-4 basis-1/4 justify-end">
        <p className="w-5 flex justify-center">
          {mix ? <MixIcon /> : <TracksIcon />}
        </p>
        <p className="w-12 text-center">{duration}</p>
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
