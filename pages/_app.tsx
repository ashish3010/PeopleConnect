import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactQueryProvider } from "../src/Providers/react-query-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}
