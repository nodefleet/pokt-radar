import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, Analytics } from "firebase/analytics";
import { useEffect } from "react";

// const firebaseConfig = {
//   apiKey: "AIzaSyBTk5A2xXDrMRMQRrnWGTmFAWCd-Z0MXJE",
//   authDomain: "poket-rader.firebaseapp.com",
//   projectId: "poket-rader",
//   storageBucket: "poket-rader.appspot.com",
//   messagingSenderId: "88565659130",
//   appId: "1:88565659130:web:42e3e46c20bd742ba8a043",
//   measurementId: "G-7NR7ZNQ4ZM",
// };

// export let analytics: Analytics | undefined;

// if (typeof window !== "undefined") {
//   const app = initializeApp(firebaseConfig);
//   analytics = getAnalytics(app);
// }

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (analytics) {
  //     logEvent(analytics, "page_view");
  //   }
  // }, []);
  return (
    <div className="bg-neutral-100 flex flex-col h-full min-h-screen relative">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
