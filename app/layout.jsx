"use client"

import Navigation from "../components/Navigation";
import AudioPlayerContainer from "../components/AudioPlayerContainer/AudioPlayerContainer";
import LoginProvider from '../context/LoginContext';
import AudioProvider from "../context/AudioContext";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';


import './globals.scss';

const queryClient = new QueryClient()


export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <LoginProvider>
          <QueryClientProvider client={queryClient}>
          <AudioProvider>
          <Navigation />
            <div className="main-content">
              {children}
            </div>
          </AudioProvider>
          </QueryClientProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
