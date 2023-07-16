"use client";

import Head from "next/head";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../api/getDjs";
import { getArtistTracks } from "../../../api/getTracks";
import TrackRow from "../../../components/Track/TrackRow/TrackRow";
import { usePathname } from "next/navigation";
import Edit from "../../../components/Icons/Edit";

const cx = classNames.bind(styles);

export async function generateStaticParams() {
  const djs = await getDjs();

  return djs.map((dj) => ({
    slug: dj.uid,
  }));
}

export default async function DjProfile({ params }) {
  const { id } = params;

  console.log("slug", id);
  const data = await getDj(params?.id);
  // const tracks = await getArtistTracks(params?.id);

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
          backgroundImage: `url(${data?.photoURL})`,
        }}
      >
        <h1>{data?.displayName}</h1>
      </div>
      {/* {isProfile && <Edit />} */}

      {/* <div className={cx("artist__tracks")}>
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
      </div> */}
    </div>
  );
}
