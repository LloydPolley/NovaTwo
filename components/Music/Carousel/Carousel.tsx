"use client";

import classNames from "classnames/bind";
import Link from "next/link";
import { TrackType } from "../../../types/tracks";
import { UserListType, UserType } from "@/types/users";

type CarouselTypes = {
  Component: React.ComponentType<{ item: TrackType; type?: string }>;
  items: UserType[];
  text?: string;
  url?: string;
};

const Carousel = ({ Component, items, text, url }: CarouselTypes) => {
  return (
    <div className="carousel rounded-lg p-2 lg:px-7">
      <div className="flex justify-between  border-widgetBlack-400 w-[calc(100%-20px)] lg:w-full ml-5 lg:ml-0 mb-4">
        <h2 className="text-xl capitalize font-bold">{text}</h2>
        {url && (
          <Link
            className="text-sm mt-auto mr-2 text-widgetBlack-300"
            href={`discover?${url}`}
          >
            See more
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto max-w-full gap-5 hide-scrollbar">
        {items &&
          items.slice(0, 8).map((item) => {
            console.log("item", item);
            return (
              <div
                className="flex-pixels overflow-ellipsis whitespace-nowrap overflow-hidden scroll-snap-start first:ml-[15px] lg:first:ml-[0px]"
                key={item?.id || item?.uid}
              >
                <Component item={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;
