import classNames from "classnames/bind";
import styles from "./discover.module.scss";
import TrackSquare from "../../components/Track/TrackSquare";
import TrackRow from "../../components/Track/TrackRow";

import { getAllTracks, getTracksWhere } from "../../api/getTracks";
import TrackList from "../../components/TrackList/TrackList";

const cx = classNames.bind(styles);

export default async function Dj() {
  const data = await getAllTracks();
  const tracks = await getTracksWhere("featured", true);

  // console.log("tracks", tracks);

  return (
    <div className={cx("dj-page")}>
      <div className={cx("hero")}>
        <h1>DISCOVER</h1>
      </div>
      <div className={cx("tracks")}>
        <h3 className={cx("tracks__featured")}>FEATURED</h3>
        <div className={cx("tracks__squares", "tracks__squares-featured")}>
          {tracks &&
            tracks.slice(0, 4).map((track) => {
              const {
                artist,
                artworkFileLocation,
                audioFileLocation,
                date,
                name,
                trackName,
                uid,
              } = track;
              return (
                <TrackSquare
                  key={`${artist}-${date}`}
                  name={name}
                  artist={artist}
                  artwork={artworkFileLocation}
                  audioFileLocation={audioFileLocation}
                  date={date}
                  trackName={trackName}
                  uid={uid}
                />
              );
            })}
        </div>
      </div>
      <TrackList tracks={data} />
    </div>
  );
}
