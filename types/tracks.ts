export type TrackListProps = {
  tracks: Track[];
  empty?: string;
};

export type Track = {
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
};

export type TrackWrapperProps = {
  tracks: Track[];
  uid?: string;
  params?: { id: string };
  isArtist?: boolean;
};
