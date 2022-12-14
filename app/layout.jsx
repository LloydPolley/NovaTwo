import Navigation from "../components/Navigation";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";

import './globals.scss';

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <Navigation email={""} />
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
