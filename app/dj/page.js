"use client";

import Head from "next/head";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Dj.module.scss";
import useDjs from "../../hooks/useDjs";
import { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import Link from "next/link";
import TrackSquare from "../../components/Track/TrackSquare";

const cx = classNames.bind(styles);

export default function Dj() {
  const { getDjs, djList } = useDjs();
  // const [djList, setDjList] = useState();

  const { details, setDetails } = useLoginContext();

  useEffect(() => {
    getDjs();
  }, []);

  return (
    <div className={cx("dj-page")}>
      {/* <h1>DJs</h1> */}
      <div className={cx("dj-list")}>
        <div className={cx("track-squares")}>
          {djList &&
            djList.map((dj) => {
              if (!dj.displayName) return;

              const { displayName, photoURL, uid } = dj;

              return (
                <TrackSquare
                  key={displayName}
                  artist={displayName}
                  artwork={photoURL}
                  uid={uid}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
