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
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  img?: string;
  uid?: string;
};

const AritstHero = ({ title, img, uid }: HeroProps) => {
  const { userData } = useAuthStore((state) => state);
  const { addFollower } = useFollowerStore((state) => state);

  const socials = [
    { icon: faInstagram, name: "Instagram", url: userData?.instagram || "" },
    { icon: faSoundcloud, name: "Soundcloud", url: userData?.soundcloud || "" },
    { icon: faSpotify, name: "Spotify", url: userData?.spotify || "" },
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
      className="flex flex-col lg:flex-row items-center lg:items-start relative bg-widgetBlack-800 lg:p-7"
      test-id="artist-hero"
    >
      <div className="size-56 lg:size-64 relative mt-4">
        <Image
          src={img}
          alt={title}
          placeholder="blur"
          blurDataURL={img}
          style={{ objectFit: "cover" }}
          fill
          className="object-cover rounded-full"
        />
      </div>

      <div className="p-4 flex flex-col justify-end md:p-5 text-center lg:text-left lg:flex-row lg:justify-between lg:m-auto lg:w-10/12">
        <div>
          <p>Discover</p>
          <h1 className="font-semibold tracking-wide text-4xl md:text-6xl text-white drop-shadow-lg">
            {title}
          </h1>
        </div>
        <div className="flex gap-8 my-4 lg:ml-auto lg:mt-auto lg:mb-0">
          {socials.map((social) => {
            // if (!social.url) return null;
            return (
              <Link key={social.name} href={social.url}>
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
