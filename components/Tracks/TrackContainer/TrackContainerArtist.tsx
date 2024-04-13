"use client";

import React, { forwardRef, Ref, Suspense, useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./TrackContainer.module.scss";
import Track from "../Track";
import { TrackType } from "../../../types/tracks";
import Link from "next/link";
import UserWidget from "../../UserWidget";

const cx = classNames.bind(style);

type TrackListProps = {
  tracks?: TrackType[];
};

const TrackContainerServer = ({ text, users, url }) => {
  return (
    <Suspense fallback={<div className={cx("track-grid")}>Loading</div>}>
      <div className={cx("track-container")}>
        <div className={cx("track-container__text")}>
          <h2>{text}</h2>
          <Link href={`discover?${url}`}>See more</Link>
        </div>

        {users?.length > 0 ? (
          <div className={cx("track-grid")}>
            {users &&
              users?.map((user) => {
                return <UserWidget user={user} key={user?.uid} />;
              })}
          </div>
        ) : (
          <p>No Tracks here...</p>
        )}
      </div>
    </Suspense>
  );
};

export default TrackContainerServer;
