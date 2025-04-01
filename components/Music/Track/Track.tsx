"use client";

import Link from "next/link";
import useAudioStore from "../../../context/AudioStore";
import Image from "next/image";
import useAuthStore from "../../../context/AuthStore";
import Like from "@/components/LayoutComps/Buttons/Like";
import { TrackType } from "@/types/tracks";
import { ReleaseType } from "@/types/releases";

// type TrackProps = {
//   item: TrackType | ReleaseType;
//   releaseId?: string;
// };

const isTrack = (item: TrackType | ReleaseType): item is TrackType => {
  return "audio" in item;
};

const Track = ({ item, releaseId }) => {
  const id = item.id;
  const title = item.title;
  const artwork = item.artwork;
  const uid = item.uid;
  const audio = isTrack(item) ? item.audio : "";

  const { isPlaying, trackContext, playContext, pauseContext } = useAudioStore(
    (state) => state
  );

  const { userData } = useAuthStore((state) => state);

  const isPlayingLocal = isPlaying && trackContext?.audio === audio;

  return (
    <div
      className=""
      key={id}
      onClick={() => {
        if (isTrack(item)) {
          !isPlayingLocal ? playContext(item) : pauseContext();
        }
      }}
    >
      <div className="relative w-full aspect-square">
        <Link
          className="shadow-lg"
          onClick={(e) => {
            audio ? e.preventDefault() : e.stopPropagation();
          }}
          href={audio ? "#" : `/discover/${uid}/${releaseId || id}`}
        >
          <Image
            className="rounded-3xl"
            src={artwork}
            placeholder="blur"
            blurDataURL={artwork}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
      <div className="pt-2 relative w-11/12 m-auto">
        <p className="text-base lg:text-lg whitespace-nowrap text-ellipsis">
          {title}
        </p>
        <Link
          className="text-widgetBlack-400 text-sm"
          onClick={(e) => e.stopPropagation()}
          href={`/discover/${uid}`}
        >
          {item.artist}
        </Link>
        {userData?.id && isTrack(item) && (
          <div className="absolute right-2 top-4">
            <Like track={item} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
