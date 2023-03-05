import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Berachain Explorer",
  description: "Blockchain explorer for berachain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-100">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
