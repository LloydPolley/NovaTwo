"use client";

import Link from "next/link";
import useAudioStore from "../../../context/AudioStore";
import Image from "next/image";
import useAuthStore from "../../../context/AuthStore";
import Like from "@/components/LayoutComps/Buttons/Like";

const Track = ({ item }) => {
  const { artist, artwork, audio, uid, title, id } = item || {};

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
        if (audio) {
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
          href={audio ? "#" : `/${uid}?f=all&name=${title}`}
        >
          <Image
            className="rounded-3xl"
            src={artwork || artwork}
            placeholder="blur"
            blurDataURL={artwork || artwork}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>
      <div className="pt-2 relative w-11/12 m-auto">
        <p className="text-lg">{title}</p>
        <Link
          className="text-widgetBlack-400 text-sm"
          onClick={(e) => e.stopPropagation()}
          href={`/${uid}`}
        >
          {artist}
        </Link>
        {userData?.id && audio && (
          <div className="absolute right-2 top-4">
            <Like track={item} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
