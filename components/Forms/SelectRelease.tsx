"use client";

import Link from "next/link";

function SelectRelease({ releases }) {
  return (
    <>
      {releases.map((release, index) => {
        const { title, id } = release;
        return (
          <Link key={id} href={`?s=4&i=${index}&t=${title}`}>
            <button className="w-full h-auto flex flex-col bg-stone-950 rounded-lg p-10 text-left mb-4">
              <span className="text-2xl font-semibold mb-2">{title}</span>
            </button>
          </Link>
        );
      })}
    </>
  );
}

export default SelectRelease;
