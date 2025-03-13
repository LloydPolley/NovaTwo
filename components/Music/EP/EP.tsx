"use client";

import Image from "next/image";
import EPTrack from "../EPTracks";

const titleRow = {
  id: "row",
  releaseId: "row1",
  uid: null,
  title: "Title",
  mix: false,
  duration: 0,
};

const EP = ({ release }) => {
  if (!release?.title) return;

  const { artwork, title, releaseDate, tracks } = release;

  return (
    <div className="rounded-xl p-5 lg:p-7 scroll-m-32" data-name={title}>
      <div className="border-b-2 border-widgetBlack-400">
        <div className="flex pb-6 pt-4">
          <div className="aspect-square w-24 lg:w-36 relative rounded-lg overflow-hidden">
            <Image
              src={artwork}
              placeholder="blur"
              blurDataURL={artwork}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col my-auto ml-4">
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-base">{releaseDate.toString()}</p>
          </div>
        </div>

        <EPTrack key="12" index="#" item={titleRow} />
      </div>

      <div className="grid gap-2.5 w-full grid-cols-1 pt-6">
        {tracks?.map((track, index) => {
          const { id } = track;
          return <EPTrack key={id} index={index} item={track} />;
        })}
      </div>
    </div>
  );
};

export default EP;
