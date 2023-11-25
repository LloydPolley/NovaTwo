export type TrackListProps = {
  tracks: TrackType[];
  empty?: string;
};

export type TrackType = {
  featured?: boolean;
  date: string;
  artist: string;
  trackName: string;
  uid: string;
  name: string;
  artworkFileLocation?: string;
  artwork?: string;
  audioFileLocation: string;
  trackId: string;
  // timestamp: number;
  mix: boolean;
};

export type TrackWrapperProps = {
  tracks: TrackType[];
  uid?: string;
  params?: { id: string };
  isArtist?: boolean;
};
