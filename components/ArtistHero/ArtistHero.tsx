"use client";

import { UserPlus } from "lucide-react";
import useAuthStore from "../../context/AuthStore";
import useFollowerStore from "@/context/FollowerStore";

type HeroProps = {
  title: string;
  img?: string;
  uid?: string;
};

const AritstHero = ({ title, img, uid }: HeroProps) => {
  const { userData } = useAuthStore((state) => state);
  const { addFollower } = useFollowerStore((state) => state);

  const yourProfile = userData?.id === uid;

  const handleFollow = async () => {
    const { displayName } = userData;
    await addFollower({
      uid: userData?.id,
      artist: displayName,
      followingId: uid,
    });
  };

  return (
    <div
      className={
        "flex flex-row relative min-h-[250px]  lg:h-[400px] bg-center bg-cover bg-no-repeat justify-between rounded-xl"
      }
      test-id="artist-hero"
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      <div className="z-10 p-4 flex flex-col justify-end md:p-5">
        <p>Discover</p>
        <h1 className="font-semibold tracking-wide text-4xl md:text-6xl text-white drop-shadow-lg">
          {title}
        </h1>
      </div>
      {/* {userData && !yourProfile && (
        <div className="z-10 flex flex-col justify-end p-4 md:p-5">
          <button
            className="bg-blue-500 text-white font-bold text-lg border-2 border-transparent rounded-3xl px-5 py-2 shadow-md hover:bg-blue-600"
            onClick={handleFollow}
          >
            <UserPlus />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default AritstHero;
