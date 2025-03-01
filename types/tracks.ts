export type TrackListProps = {
  tracks: TrackType[];
  empty?: string;
};

export type TrackType = {
  id: string;
  date: string;
  artist: string;
  title: string;
  uid: string;
  mix: boolean;
  releaseId: string;
};

export type TrackWrapperProps = {
  tracks: TrackType[];
  uid?: string;
  params?: { id: string };
  isArtist?: boolean;
};
