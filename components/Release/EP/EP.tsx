"use client";

import Image from "next/image";
import Track from "../Track";

const EP = ({ release, tracks }) => {
  if (!release?.name) {
    return;
  }

  const { artworkFileLocation, name, date } = release;

  return (
    <div className="bg-stone-950 rounded-xl p-4" data-name={name}>
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
          <p className="text-base">{date.split(",")[0]}</p>
        </div>
      </div>
      <div className="grid gap-2.5 w-full grid-cols-1">
        {tracks?.map((track, index) => {
          const { name } = track;
          return <Track key={name} index={index} item={track} />;
        })}
      </div>
    </div>
  );
};

export default EP;
