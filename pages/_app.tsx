import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ReactQueryProvider } from "../src/Providers/react-query-provider";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Disable Next.js scroll restoration
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}

export default MyApp;
