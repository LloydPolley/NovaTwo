"use client";

import Like from "../../LayoutComps/Buttons/Like";
import useAudioStore from "../../../context/AudioStore";
import useAuthStore from "../../../context/AuthStore";
import { HandHeart, Timer, Disc3, Library } from "lucide-react";

const Track = ({ item, index }) => {
  const { audio, uid, title, mix, duration, id } = item || {};

  const { isPlaying, trackContext, playContext, pauseContext } = useAudioStore(
    (state) => state
  );

  const { userData } = useAuthStore((state) => state);

  const isPlayingLocal = isPlaying && trackContext?.audio === audio;

  // console.log("item", item);

  return (
    <div
      className="flex w-full p-2 justify-between items-center rounded-lg hover:bg-widgetBlack-600 cursor-pointer"
      key={id}
      onClick={() => playContext(item)}
    >
      <div className="flex items-center space-x-4 basis-3/4">
        <p className="w-10 text-center">
          {Number.isInteger(index) ? index + 1 : index}
        </p>
        <p className="font-medium truncate w-32 md:w-60">{title}</p>
      </div>

      <div className="flex items-center space-x-4 basis-1/4 justify-end">
        <p className="w-5 flex justify-center">
          {mix ? <Disc3 /> : <Library />}
        </p>
        <p className="w-12 text-center">
          {duration === 0 ? <Timer className="m-auto" /> : duration}
        </p>
        {userData?.id && id !== "row" && (
          <Like
            track={{
              title,
              audio,
              uid,
              id,
            }}
          />
        )}
        {id === "row" && userData?.id && <HandHeart />}
      </div>
    </div>
  );
};

export default Track;
