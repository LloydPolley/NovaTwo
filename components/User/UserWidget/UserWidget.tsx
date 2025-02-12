"use client";

import Link from "next/link";

const UserWidget = ({ item }) => {
  return (
    <div className="w-full h-full">
      <Link className="flex flex-col-reverse" href={`/${item?.uid}`}>
        <img
          className="h-full aspect-square w-full object-cover rounded-full shadow-lg"
          src={item?.profile}
        />
      </Link>
      <p className="font-medium mt-2 mb-0 text-center">{item?.displayName}</p>
    </div>
  );
};

export default UserWidget;
