"use client";

import Link from "next/link";

const UserWidget = ({ item }) => {
  const { id, artwork, artist } = item;
  return (
    <div className="w-full h-full">
      <Link className="flex flex-col-reverse" href={`/${id}`}>
        <img
          className="h-full aspect-square w-full object-cover rounded-full shadow-lg"
          src={artwork}
        />
      </Link>
      <p className="font-medium mt-2 mb-0 text-center">{artist}</p>
    </div>
  );
};

export default UserWidget;
