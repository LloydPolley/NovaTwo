"use client";

import React, { useState, useEffect } from "react";
import Track from "./Track";

type TrackListProps = {
  trackFetch: Function;
  uid: String;
};

const LikesContainer = ({ likes }: TrackListProps) => {
  return (
    <div className="likes-container fadeIn py-4 px-3 flex-1">
      {likes?.length > 0 ? (
        <div className="grid gap-3 fadeIn flex-grow grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-fr">
          {likes?.map((track) => {
            if (!track.artist) return null;
            return <Track key={track.name} item={track} />;
          })}
        </div>
      ) : (
        <p className="h-48 text-center flex flex-col justify-evenly">
          No Tracks here
        </p>
      )}
    </div>
  );
};

export default LikesContainer;
