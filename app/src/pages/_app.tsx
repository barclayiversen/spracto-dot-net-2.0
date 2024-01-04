// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LoadStatusProvider } from "@/context/loadStatusContext";
import { SessionProvider } from "next-auth/react";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <LoadStatusProvider>
        <Component {...pageProps} />
      </LoadStatusProvider>
    </SessionProvider>
  );
};

export default MyApp;
