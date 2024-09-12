"use client";

import React, { useState, useEffect, useRef } from "react";
import Track from "../Track";
import EP from "../EP";
import {
  getArtistTracks,
  getTracksWhere,
  getArtistReleases,
} from "../../../api/getTracks";
import { getUserLikes } from "../../../api/addLike";
import Link from "next/link";

type TrackListProps = {
  searchParams: {
    f?: string;
    order?: string;
    name?: string;
  };
  params: {
    id: string;
  };
  text?: string;
  trackList?: TrackType[];
  url?: string;
};

const TrackContainer = ({
  searchParams,
  params,
  text,
  trackList,
  url,
}: TrackListProps) => {
  const [tracks, setTracks] = useState([]);
  const [sortedTracks, setSortedTracks] = useState({});
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const fetchingTracks = async () => {
    setLoading(true);

    switch (searchParams.f) {
      case "all":
        setTracks(await getArtistTracks(params?.id));
        setReleases(await getArtistReleases(params?.id));
        break;
      case "tracks":
        setTracks(await getTracksWhere("mix", false, params.id));
        break;
      case "mix":
        setTracks(await getTracksWhere("mix", true, params.id));
        break;
      case "likes":
        setTracks(await getUserLikes(params?.id));
        break;
    }
  };

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
    setTracks([]);
    if (searchParams.f !== "following" && !trackList) {
      fetchingTracks();
    } else if (trackList) {
      setTracks(trackList);
    }
  }, [searchParams.f]);

  useEffect(() => {
    setSortedTracks(sortByReleaseId(tracks));
  }, [tracks]);

  const sortByReleaseId = (items) => {
    const result = {};
    tracks.forEach((track) => {
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

  return (
    <div className="p-4 flex-1 animate-fadeIn">
      {text && (
        <div className="flex justify-between mb-2.5">
          <h2 className="capitalize pl-2.5">{text}</h2>
          {url && <Link href={`discover?${url}`}>See more</Link>}
        </div>
      )}
      {releases?.length > 0 ? (
        <div className="grid gap-6 w-full animate-fadeIn grid-cols-1 items-start">
          {releases.map((release) => {
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
