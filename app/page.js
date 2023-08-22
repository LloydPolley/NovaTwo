import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { getTracksWhere, getAllTracks } from "../api/getTracks";
import SwiperCarousel from "../components/Swiper/SwiperCarousel/SwiperCarousel";
import TrackSquare from "../components/Track/TrackSquare";
import Link from "next/link";
import RightArrow from "../components/Icons/RightArrow";

const cx = classNames.bind(styles);

export default async function Home() {
  const data = await getTracksWhere("label", "afterlife");
  const tracks = await getTracksWhere("featured", true);

  return (
    <div className={cx("home")}>
      <div className={cx("home__hero")}>
        <div className={cx("home__hero-box")}>
          <h1>DISCOVER</h1>
        </div>
        <div className={cx("home__hero-box")}>
          <h1>CREATE</h1>
        </div>
      </div>
      <div className={cx("promo")}>
        <Link className={cx("")} href={`/discover`}>
          DISCOVER <RightArrow />
        </Link>
      </div>
      <div className={cx("label-carousel")}>
        <h3>AFTERLIFE</h3>
        <div className={cx("label-carousel__box")}>
          {data && <SwiperCarousel data={data} />}
        </div>
      </div>
      <div className={cx("tracks")}>
        <h3>FEATURED</h3>
        <div className={cx("tracks__squares")}>
          {tracks &&
            tracks.slice(0, 6).map((track) => {
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

      <div className={cx("promo")}>
        <Link className={cx("")} href={`/discover`}>
          CREATE <RightArrow />
        </Link>
      </div>
    </div>
  );
}
