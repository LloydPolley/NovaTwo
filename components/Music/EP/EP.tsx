"use client";

import Image from "next/image";
import EPTrack from "../EPTracks";

const EP = ({ release, tracks }) => {
  if (!release?.name) return;

  const { artworkFileLocation, name, date } = release;

  return (
    <div className="rounded-xl p-5 lg:p-7 scroll-m-32" data-name={name}>
      <div className="flex border-b-2 border-widgetBlack-400 pb-6 pt-4">
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
          <p className="text-2xl font-semibold">{name}</p>
          <p className="text-base">{date.split(",")[0]}</p>
        </div>
      </div>
      <div className="grid gap-2.5 w-full grid-cols-1 pt-6">
        {tracks?.map((track, index) => {
          const { name } = track;
          return <EPTrack key={name} index={index} item={track} />;
        })}
      </div>
    </div>
  );
};

export default EP;
