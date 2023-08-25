import classNames from "classnames/bind";
import style from "./TrackList.module.scss";
import TrackRow from "../Track/TrackRow";

const cx = classNames.bind(style);

export default function TrackList({ tracks, empty }) {
  if (tracks?.length < 0) {
    return null;
  }

  return (
    <div className={cx("tracks")}>
      <div className={cx("tracks__squares")}>
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
              <TrackRow
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
    </div>
  );
}
