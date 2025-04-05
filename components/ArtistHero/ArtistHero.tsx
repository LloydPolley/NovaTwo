"use client";

import { UserPlus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faSpotify,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";

import useAuthStore from "@/context/AuthStore";
import useFollowerStore from "@/context/FollowerStore";
import Link from "next/link";

type HeroProps = {
  artist: string;
  img?: string;
  uid?: string;
  soundcloud?: string;
  instagram?: string;
  spotify?: string;
};

const AritstHero = ({
  artist,
  img,
  uid,
  soundcloud,
  instagram,
  spotify,
}: HeroProps) => {
  const { userData } = useAuthStore((state) => state);
  const { addFollower } = useFollowerStore((state) => state);

  const socials = [
    { icon: faInstagram, name: "Instagram", url: instagram || "" },
    { icon: faSoundcloud, name: "Soundcloud", url: soundcloud || "" },
    { icon: faSpotify, name: "Spotify", url: spotify || "" },
  ];

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
      className="flex flex-col lg:flex-row items-center lg:items-start relative bg-widgetBlack-800  min-h-72 justify-end"
      test-id="artist-hero"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-4 flex flex-row justify-between w-full text-center lg:text-left lg:justify-between lg:mt-auto">
        <div className="text-left">
          <p>Discover</p>
          <h1 className="font-semibold tracking-wide text-4xl md:text-6xl text-white drop-shadow-lg">
            {artist}
          </h1>
        </div>
        <div className="flex justify-evenly gap-8 mt-auto lg:ml-auto lg:mt-auto lg:mb-0">
          {socials.map((social) => {
            if (!social.url) return null;
            return (
              <Link key={social.name} href={social.url} target="_blank">
                <FontAwesomeIcon
                  key={social.name}
                  icon={social.icon}
                  className="text-3xl"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AritstHero;
