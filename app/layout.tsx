import Navigation from "../components/Navigation";
import AudioWidget from "../components/AudioWidget/AudioWidget";
import LoginProvider from "../context/LoginContext";
import AudioProvider from "../context/AudioContext";
import Footer from "../components/Footer";
import { Lato, Raleway } from "next/font/google";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const raleway = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

import "./globals.scss";

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html className={`${lato.variable} ${raleway.variable}`}>
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
            {/* <Footer /> */}
            <AudioWidget />
          </AudioProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
