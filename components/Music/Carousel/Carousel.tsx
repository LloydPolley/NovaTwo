"use client";

import Link from "next/link";
import { TrackType } from "../../../types/tracks";
import { UserType } from "@/types/users";
import { ReleaseCarouselType } from "@/types/releases";

type CarouselTypes = {
  Component: React.ComponentType<{
    item: TrackType | UserType | ReleaseCarouselType;
    type?: string;
    releaseId?: string;
  }>;
  items: (TrackType | UserType | ReleaseCarouselType)[];
  text?: string;
  url?: string;
};

const Carousel = ({ Component, items, text, url }: CarouselTypes) => {
  return (
    <div className="carousel rounded-xl px-2 py-4 lg:px-7">
      <div className="flex justify-between  border-widgetBlack-400 w-[calc(100%-20px)] lg:w-full ml-5 lg:ml-0 mb-4">
        <h2 className="text-xl capitalize font-bold">{text}</h2>
        {url && (
          <Link
            className="text-sm mt-auto mr-2 text-widgetBlack-300"
            href={`discover/${url}`}
          >
            See more
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto max-w-full gap-5 hide-scrollbar">
        {items &&
          items.slice(0, 8).map((item) => {
            return (
              <div
                className="flex-pixels overflow-ellipsis whitespace-nowrap overflow-hidden scroll-snap-start first:ml-[15px] lg:first:ml-[0px]"
                key={item.id}
              >
                <Component item={item} releaseId={item.id} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;
