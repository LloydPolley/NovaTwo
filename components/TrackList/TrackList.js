import classNames from "classnames/bind";
import style from "./TrackList.module.scss";
import TrackRow from "../Track/TrackRow";

const cx = classNames.bind(style);

export default function TrackList({ tracks }) {
  if (tracks?.length < 0) {
    return null;
  }

  return (
    <div className={cx("track-list")}>
      {tracks?.map((track) => (
        <TrackRow
          key={track.name}
          name={track.name}
          artist={track.artist}
          audioFileLocation={track.audioFileLocation}
          artwork={track.artwork || track?.artworkFileLocation}
          uid={track.uid}
          trackId={track.trackId}
        />
      ))}
    </div>
  );
}
