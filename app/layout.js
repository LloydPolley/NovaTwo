import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AudioWidget from "../components/AudioWidget/AudioWidget";
import LoginProvider from "../context/LoginContext";
import AudioProvider from "../context/AudioContext";
import { Lato } from "next/font/google";
import Loading from "../components/Loading";

const font = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

import "./globals.scss";
import { Suspense } from "react";

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html className={font.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body id="body">
        <LoginProvider>
          <AudioProvider>
            <Navigation />
            <div className="wrapper">{children}</div>
            <AudioWidget />
          </AudioProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
