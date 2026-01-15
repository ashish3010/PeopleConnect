import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { ReactQueryProvider } from "../src/Providers/react-query-provider";
import { ToastProvider } from "../src/Providers/toast-provider";
import { startMockServer } from "../src/mock";
// import PageTransition from "../src/components/common/PageTransition";

// Initialize Mirage mock server in development
if (typeof window !== "undefined") {
  startMockServer();
}

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
      <ToastProvider>
        {/* <PageTransition> */}
        <Component {...pageProps} />
        {/* </PageTransition> */}
      </ToastProvider>
    </ReactQueryProvider>
  );
}

export default MyApp;
