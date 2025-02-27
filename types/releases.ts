import { TrackType } from "./tracks";

export type ReleaseType = {
  id: string;
  title: string;
  artwork: string;
  uid: string;
  releaseDate: Date;
  tracks: TrackType[];
};
