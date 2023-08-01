import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackSquare from "../../components/Track/TrackSquare";
import TrackRow from "../../components/Track/TrackRow";

import { getAllTracks, getTracksWhere } from "../../api/getTracks";

const cx = classNames.bind(styles);

export default async function Dj() {
  const data = await getAllTracks();
  const tracks = await getTracksWhere("featured", true);

  // console.log("tracks", tracks);

  return (
    <div className={cx("dj-page")}>
      {/* <h1>Releases</h1> */}
      <div className={cx("tracks")}>
        <div className={cx("tracks__promo")}>
          <h2>Popular</h2>
          <div className={cx("tracks__row-promo")}>
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
                } = track;

                return (
                  <TrackRow
                    key={name}
                    name={name}
                    artist={artist}
                    artwork={artworkFileLocation}
                    audioFileLocation={audioFileLocation}
                    uid={uid}
                    trackId={trackId}
                  />
                );
              })}
          </div>
        </div>
        <div className={cx("tracks__promo")}>
          <h2>Recent</h2>
          <div className={cx("tracks__row")}>
            {data &&
              data.map((track) => {
                if (!track.artist) return;

                const {
                  artist,
                  artworkFileLocation,
                  audioFileLocation,
                  uid,
                  name,
                  trackId,
                } = track;

                return (
                  <TrackRow
                    key={name}
                    name={name}
                    artist={artist}
                    artwork={artworkFileLocation}
                    audioFileLocation={audioFileLocation}
                    uid={uid}
                    trackId={trackId}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
