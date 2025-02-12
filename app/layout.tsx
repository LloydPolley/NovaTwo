import Navigation from "../components/LayoutComps/Navigation";
import NavContent from "../components/LayoutComps/Navigation/NavContent";
import AudioWidget from "../components/AudioWidgetPlugin";
import { Lato, Raleway, Poppins, Anton, Bebas_Neue } from "next/font/google";

import "./globals.scss";
import Wrapper from "../components/LayoutComps/Wrapper";
import { Suspense } from "react";
import GlobalProvider from "../context/GlobalContext";
import { Analytics } from "@vercel/analytics/react";

require("dotenv").config();

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

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anton",
});

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export default function RootLayout(props) {
  const { children } = props;

  return (
    <html
      className={`${lato.variable} ${raleway.variable} ${poppins.variable} ${anton.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body id="body">
        <GlobalProvider>
          <Suspense>
            <Navigation />
            <div className={"side-bar"}>
              <NavContent />
              <Wrapper>{children}</Wrapper>
            </div>
          </Suspense>

          <AudioWidget />
        </GlobalProvider>
        <Analytics />
      </body>
    </html>
  );
}
