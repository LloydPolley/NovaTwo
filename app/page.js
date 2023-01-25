"use client";

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import useAddTrack from "../hooks/useAddTrack";

// import styles from "../styles/Home.module.scss";

export default function Home() {
  const { readTracks } = useAddTrack();
  const [tracks, setTracks] = useState();

  useEffect(() => {
    const tracks = readTracks();
    console.log("tracks", tracks);
  }, []);

  return (
    <div>
      {tracks &&
        tracks.map((track) => {
          <div>hello</div>;
        })}
      <h1></h1>
    </div>
  );
}
