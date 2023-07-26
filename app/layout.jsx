import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AudioWidget from "../components/AudioWidget/AudioWidget";
import LoginProvider from "../context/LoginContext";
import AudioProvider from "../context/AudioContext";
import { Lato } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

import "./globals.scss";

export default function RootLayout({ children }) {
  return (
    <html className={font.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <LoginProvider>
          <AudioProvider>
            <Navigation />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              pauseOnFocusLoss={false}
              newestOnTop
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover
              theme="dark"
            />
            <div className="main-content">{children}</div>
            <Footer />
            <AudioWidget />
          </AudioProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
