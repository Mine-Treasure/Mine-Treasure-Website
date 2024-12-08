import "./globals.css";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mine Treasure",
  description: "Mine treasure is a Minecraft datapack which aims to enhance the mining experience. This datapack does so by making treasure randomly spawn while mining.",
  icons: {
    icon: "/images/Mine_Treasure.png",
  },
  openGraph: {
    images: [
      {
        url: "/images/Mine_Treasure.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${interTight.className}`}>
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
    </html>
  );
}
