import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LoadStatusProvider } from "@/context/loadStatusContext";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <LoadStatusProvider>
      <Component {...pageProps} />
    </LoadStatusProvider>
  );
};

export default MyApp;
