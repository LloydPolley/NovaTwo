"use client";

import Head from "next/head";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Dj.module.scss";
import useDjs from "../../hooks/useDjs";
import { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";

const cx = classNames.bind(styles);

export default function Dj() {
  const { getDjs, djList } = useDjs();
  // const [djList, setDjList] = useState();

  const { details, setDetails } = useLoginContext();

  useEffect(() => {
    console.log("details", details);
  }, [details]);

  useEffect(() => {
    getDjs();
  }, []);

  return (
    <div className={cx("dj-page")}>
      <h1>DJs</h1>
      <div className={cx("dj-list")}>
        {djList &&
          djList.map((dj) => {
            if (!dj.displayName) return;
            const { displayName } = dj;
            return (
              <div className={cx("dj-widget")} key={displayName}>
                <p>{displayName}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
