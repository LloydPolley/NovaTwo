"use client";

import useFollowerStore from "../../context/FollowerStore";
import useAuthStore from "../../context/AuthStore";

type HeroProps = {
  title: string;
  img?: string;
  user?: any;
  box?: boolean;
  imgBox?: string;
};

const AritstHero = ({ title, img, imgBox, user, box }: HeroProps) => {
  const { userData } = useAuthStore((state) => state);
  const { setNewFollowing, following } = useFollowerStore((state) => state);

  const yourProfile = userData?.uid === user?.uid;

  return (
    <div
      className={`${"flex flex-row relative min-h-[250px]  lg:h-[400px] bg-center bg-cover bg-no-repeat justify-between"} ${
        imgBox
          ? "flex-col text-center justify-center h-auto p-5 lg:flex-row lg:justify-start lg:text-left"
          : ""
      }`}
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      {box && (
        <div
          className="h-[200px] w-[200px] mx-auto rounded-3xl bg-no-repeat bg-cover shadow-xl lg:mt-auto lg:mx-0 lg:h-[250px] lg:w-[250px]"
          style={{
            backgroundImage: `url("${imgBox}")`,
          }}
        />
      )}
      <div className="z-10 p-4 flex flex-col justify-end md:p-5">
        <p>Discover</p>
        <h1 className="font-semibold tracking-wide text-4xl md:text-6xl text-white drop-shadow-lg">
          {title}
        </h1>
      </div>
      {userData &&
        user &&
        !yourProfile &&
        Object?.keys(user).length !== 0 &&
        !following?.some((follower) => follower.uid === user?.uid) && (
          <div className="z-10 flex flex-col justify-end p-4 md:p-5">
            <button
              className="bg-blue-500 text-white font-bold text-lg border-2 border-transparent rounded-3xl px-5 py-2 w-[100px] shadow-md hover:bg-blue-600"
              onClick={() => {
                const { displayName, uid } = userData;
                const newFollowing = {
                  userName: displayName,
                  user: uid,
                  ...user,
                };
                setNewFollowing(newFollowing);
              }}
            >
              Follow
            </button>
          </div>
        )}
    </div>
  );
};

export default AritstHero;
