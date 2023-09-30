import classNames from "classnames/bind";
import style from "./TrackGridContainer.module.scss";
import TrackGrid from "./TrackGrid";

type TrackListProps = {
  tracks: track[];
  empty?: string;
};

type track = {
  featured?: boolean;
  date: string;
  artist: string;
  trackName: string;
  uid: string;
  name: string;
  artworkFileLocation?: string;
  artwork?: string;
  audioFileLocation: string;
  trackId: string;
};

const cx = classNames.bind(style);

export default function TrackList({ tracks }: TrackListProps) {
  if (tracks?.length < 0) {
    return null;
  }

  return (
    <div className={cx("track-grid")}>
      {tracks &&
        tracks.map((track) => {
          if (!track.artist) return;

          const {
            artist,
            artworkFileLocation,
            audioFileLocation,
            uid,
            name,
            trackId,
            artwork,
          } = track;

          return (
            <TrackGrid
              key={name}
              name={name}
              artist={artist}
              artwork={artworkFileLocation || artwork}
              audioFileLocation={audioFileLocation}
              uid={uid}
              trackId={trackId}
            />
          );
        })}
    </div>
  );
}
