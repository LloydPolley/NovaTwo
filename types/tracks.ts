export type TrackListProps = {
  tracks: TrackType[];
  empty?: string;
};

export type TrackType = {
  id: string;
  title: string;
  audio: string;
  uid: string;
  mix: boolean;
};

export type TrackWrapperProps = {
  tracks: TrackType[];
  uid?: string;
  params?: { id: string };
  id: string;
  isArtist?: boolean;
};
