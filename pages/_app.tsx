import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-neutral-100 flex flex-col h-screen relative">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
