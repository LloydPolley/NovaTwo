import classNames from "classnames/bind";
import style from "./TrackListContainer.module.scss";
import TrackRow from "./TrackList";

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
  artworkFileLocation: string;
  audioFileLocation: string;
  trackId: string;
};

const cx = classNames.bind(style);

export default function TrackList({ tracks }: TrackListProps) {
  if (tracks?.length < 0) {
    return <p>Nothing here</p>;
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
