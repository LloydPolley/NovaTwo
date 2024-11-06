"use client";

import React, { useState, useEffect, useRef } from "react";
import EP from "../EP";

type TrackListProps = {
  searchParams: {
    f?: string;
    order?: string;
    name?: string;
  };
  trackList?: TrackType[];
  releaseList: [];
};

const TrackContainer = ({
  searchParams,
  trackList,
  releaseList,
}: TrackListProps) => {
  const [tracks, setTracks] = useState([]);
  const [sortedTracks, setSortedTracks] = useState({});
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  console.log("trackList", trackList);

  useEffect(() => {
    const { name } = searchParams;
    if (name && !scrolled && !loading) {
      const decoded = decodeURIComponent(name);
      const observer = new MutationObserver((mutationsList, observer) => {
        const element = document.querySelector(`[data-name="${decoded}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setScrolled(true);
          element.classList.add("flash-once");
          observer.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [searchParams, scrolled, loading]);

  useEffect(() => {
    setSortedTracks(sortByReleaseId(trackList));
  }, [tracks]);

  const sortByReleaseId = (items) => {
    const result = {};
    trackList.forEach((track) => {
      if (track.releaseId) {
        if (!result[track.releaseId]) {
          result[track.releaseId] = [];
        }
        result[track.releaseId].push(track);
      } else {
        const key = track.trackId;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(track);
      }
    });
    return result;
  };

  useEffect(() => {
    setLoading(false);
  }, [tracks]);

  if (searchParams?.f === "following") {
    return null;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  console.log("sortedTracks", sortedTracks);

  return (
    <div className="p-4 flex-1 animate-fadeIn">
      {releaseList?.length > 0 ? (
        <div className="grid gap-6 w-full animate-fadeIn grid-cols-1 items-start">
          {releaseList.map((release) => {
            if (!release.artist) return null;
            return (
              <EP
                key={release.name}
                release={release}
                tracks={sortedTracks[release?.releaseId]}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center min-h-[300px] flex flex-col justify-center">
          No Tracks here
        </p>
      )}
    </div>
  );
};

export default TrackContainer;
