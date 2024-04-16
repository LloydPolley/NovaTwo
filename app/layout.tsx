import classNames from "classnames/bind";

import Navigation from "../components/Navigation";
import NavContent from "../components/Navigation/NavContent";
import AudioWidget from "../components/AudioWidgetPlugin";
import { Providers } from "../context/Providers";
import { Lato, Raleway, Poppins } from "next/font/google";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

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

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

import "./globals.scss";
import FollowersProvider from "../context/FollowersContext";
import Wrapper from "../components/Wrapper";
import { Suspense } from "react";

export default function RootLayout(props) {
  const { children } = props;

  return (
    <html
      className={`${lato.variable} ${raleway.variable} ${poppins.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body id="body">
        <Providers>
          <Suspense>
            <Navigation />
          </Suspense>
          <div className={"side-bar"}>
            <Suspense>
              <NavContent />
            </Suspense>
            <Wrapper>{children}</Wrapper>
          </div>
          <AudioWidget />
        </Providers>
      </body>
    </html>
  );
}
