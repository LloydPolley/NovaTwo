import classNames from "classnames/bind";
import style from "./TrackGridContainer.module.scss";
import TrackGrid from "./TrackGrid";
import { TrackListProps } from "../../../types/tracks";

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
