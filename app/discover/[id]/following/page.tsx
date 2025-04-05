"use client";

import useFollowerStore from "@/context/FollowerStore";
import UserWidget from "@/components/User/UserWidget";
import Header from "@/components/Header/Header";

export default function FollowPage() {
  const { followers } = useFollowerStore((state) => state);

  return (
    <div className="rounded flex-grow">
      <Header title="Following" />
      <div className="grid gap-4 w-full p-5 flex-grow flex-wrap grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {followers?.map((user) => {
          if (!user) return;
          return <UserWidget key={user?.uid} item={user} />;
        })}
      </div>
    </div>
  );
}
