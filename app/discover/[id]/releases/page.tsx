import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import { getDj } from "../../../../api/getDjs";
import {
  getArtistTracks,
  getAllLikedTracks,
  getAllTracks,
} from "../../../../api/getTracks";
import { cookies } from "next/headers";
import Link from "next/link";
import Edit from "../../../../components/Icons/Edit";
import UploadIcon from "../../../../components/Icons/UploadIcon";
import Hero from "../../../../components/Hero";
import Wrapper from "../../../../components/Wrapper";
import { Suspense } from "react";
import LoadingGrid from "../../../../components/LoadingGrid";
import TrackContainer from "../../../../components/Tracks/TrackContainer";
import RadioMenu from "../../../../components/RadioMenu";

const cx = classNames.bind(styles);

export default async function DjProfile({ params }) {
  const user = await getDj(params?.id);
  const tracks = await getArtistTracks(user?.uid);

  return (
    <Suspense fallback={<LoadingGrid />}>
      <TrackContainer tracks={tracks} />
    </Suspense>
  );
}
