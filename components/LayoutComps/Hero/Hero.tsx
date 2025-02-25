"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative h-[325px] rounded-3xl overflow-hidden mb-5 bg-cover bg-center bg-no-repeat lg:p-4"
      style={{
        backgroundImage: 'url("/release1.jpg")',
        backgroundPosition: "center 40%",
      }}
    >
      <div className="flex flex-col justify-around h-full">
        <h1 className="text-white text-center font-bold text-4xl mt-[75px] lg:mt-[50px]">
          Create, share, <br /> connect
        </h1>
        <div className="flex justify-center gap-4">
          <Link className="" href="/login">
            Get started
          </Link>
          <Link className="" href="/discover?f=releases">
            Discover
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
