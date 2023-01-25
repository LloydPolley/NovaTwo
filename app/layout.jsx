"use client"

import Navigation from "../components/Navigation";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import LoginProvider from '../context/LoginContext';
import AudioProvider from "../context/AudioContext";


import './globals.scss';

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <LoginProvider>
          <Navigation />
          <AudioProvider>
            {children}
            <AudioPlayer />
          </AudioProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
