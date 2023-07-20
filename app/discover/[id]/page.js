import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../api/getDjs";
import { getArtistTracks } from "../../../api/getTracks";
import TrackRow from "../../../components/Track/TrackRow/TrackRow";
import { usePathname } from "next/navigation";
import Edit from "../../../components/Icons/Edit";
import PlayIcon from "../../../components/Icons/PlayIcon";

const cx = classNames.bind(styles);

export default async function DjProfile({ params }) {
  const data = await getDj(params?.id);
  const tracks = await getArtistTracks(params?.id);

  // const pathname = usePathname();
  // const [isProfile, setIsProfile] = useState();
  // const { data, status } = useQuery(["getDj", params?.id], getDj);

  // useEffect(() => {
  //   if (userData?.uid === pathname.split("/")[2]) {
  //     setIsProfile(true);
  //   }
  // }, [userData]);

  return (
    <div className={cx("artist")}>
      <div
        className={cx("artist__hero")}
        style={{
          backgroundImage: `url(${data?.background})`,
        }}
      >
        <div className={cx("artist__hero-overlay")} />
        <div className={cx("artist__profile")}>
          <div className={cx("artist__profile-container-img")}>
            <Image
              className={cx("artist__profile-img")}
              src={data?.profile}
              // width={200}
              // height={200}
              fill={true}
              // objectFit={"contain"}
              alt="Picture of the author"
            />
          </div>

          <div className={cx("artist__profile-info")}>
            <div>
              <h1>{data?.displayName}</h1>
              <button className={cx("cta")}>
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {isProfile && <Edit />} */}

      <div className={cx("artist__tracks")}>
        <h2>TRACKS</h2>
        <div className={cx("artist__track-list")}>
          {tracks?.map((track) => (
            <TrackRow
              key={track.name}
              name={track.name}
              artist={track.artist}
              audioFileLocation={track.audioFileLocation}
              artwork={track.artworkFileLocation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
