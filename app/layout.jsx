"use client"

import Navigation from "../components/Navigation";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import LoginProvider from '../context/LoginContext';
import AudioProvider from "../context/AudioContext";


import './globals.scss';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <LoginProvider>
          <Navigation />
          <AudioProvider>
            <div className="main-content">
              {children}
            </div>
            <AudioPlayer />
          </AudioProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
