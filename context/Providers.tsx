import LoginProvider from "../context/LoginContext";
import AudioProvider from "../context/AudioContext";
import LikesProvider from "../context/LikesContext";
import FollowersProvider from "../context/FollowersContext";

export const Providers = ({ children }) => (
  <LoginProvider>
    <FollowersProvider>
      <LikesProvider>
        <AudioProvider>{children}</AudioProvider>
      </LikesProvider>
    </FollowersProvider>
  </LoginProvider>
);
