import classNames from "classnames/bind";
import styles from "./Dj.module.scss";
import TrackSquare from "../../components/Track/TrackSquare";
import TrackRow from "../../components/Track/TrackRow";

import { getAllTracks } from "../../api/getTracks";

const cx = classNames.bind(styles);

export default async function Dj() {
  const data = await getAllTracks();

  return (
    <div className={cx("dj-page")}>
      <h1>Releases</h1>
      <div className={cx("dj-list")}>
        <div className={cx("track-squares")}>
          {data &&
            data?.map((track) => {
              if (!track.artist) return;

              const {
                artist,
                artworkFileLocation,
                audioFileLocation,
                uid,
                name,
              } = track;

              return (
                <TrackRow
                  key={name}
                  name={name}
                  artist={artist}
                  artwork={artworkFileLocation}
                  audioFileLocation={audioFileLocation}
                  uid={uid}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
