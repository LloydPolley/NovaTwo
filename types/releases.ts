import { TrackType } from "./tracks";

export type ReleaseCarouselType = {
  id: string;
  title: string;
  artwork: string;
  uid: string;
};

export type ReleaseType = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  uid: string;
  releaseDate: Date;
  tracks: TrackType[];
};
