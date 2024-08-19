"use client";

import classNames from "classnames/bind";
import Play from "../../Buttons/Play";
import Like from "../../Buttons/Like";
import Link from "next/link";
import useAudioStore from "../../../context/AudioStore";
import Image from "next/image";
import useAuthStore from "../../../context/AuthStore";
import Track from "../Track";

const EP = ({ release, tracks }) => {
  if (!release?.name) {
    return;
  }

  console.log("tracks 111", tracks);

  const { artworkFileLocation, name, label } = release;

  return (
    <div className="bg-stone-950 rounded-xl p-4">
      <div className="flex border-b-2 border-gray-700 pb-8 pt-4">
        <div className="aspect-square w-24 lg:w-36 relative rounded-lg overflow-hidden">
          <Image
            src={artworkFileLocation}
            placeholder="blur"
            blurDataURL={artworkFileLocation}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col my-auto ml-4">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-base">{label}</p>
        </div>
      </div>
      {tracks?.map((track, index) => {
        const { name } = track;
        return <Track key={name} index={index} item={track} />;
      })}
    </div>
  );
};

export default EP;
