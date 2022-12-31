"use client";

import Head from "next/head";
import Image from "next/image";
import useAddTrack from "../hooks/useAddTrack";

// import styles from "../styles/Home.module.scss";

export default function Home() {
  const { readTracks } = useAddTrack();

  const tracks = readTracks();

  console.log("tracks", tracks);

  return (
    <div>
      {/* {tracks.map((track) => {
        <div></div>;
      })} */}
    </div>
  );
}
