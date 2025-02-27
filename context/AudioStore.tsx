import { create } from "zustand";
import { TrackType } from "../types/tracks";

type AudioStore = {
  isPlaying: boolean;
  trackContext: TrackType;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  playContext: (track: TrackType) => void;
  pauseContext: () => void;
  setAudioRef: (ref: React.MutableRefObject<HTMLAudioElement | null>) => void;
};

const useAudioStore = create<AudioStore>()((set) => ({
  isPlaying: false,
  trackContext: {} as TrackType,
  audioRef: null,
  playContext: (track) =>
    set(({ audioRef }) => {
      console.log("track", track);
      audioRef.current.play();
      return { trackContext: track, isPlaying: true };
    }),
  pauseContext: () =>
    set(({ audioRef }) => {
      audioRef.current.pause();
      return { isPlaying: false };
    }),
  setAudioRef: (ref) => set({ audioRef: ref }),
}));

export default useAudioStore;
