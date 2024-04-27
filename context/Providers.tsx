import LoginProvider from "../context/LoginContext";
import AudioProvider from "../context/AudioContext";
import GlobalProvder from "../context/GlobalContext";

export const Providers = ({ children }) => (
  <LoginProvider>
    <GlobalProvder>
      <AudioProvider>{children}</AudioProvider>
    </GlobalProvder>
  </LoginProvider>
);
