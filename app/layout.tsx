import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineShelf",
  description: "Find Movies in a better way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-(family-name:--font-outfit)">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <footer className="mt-auto py-3 border-t border-white/10">
          <div className="container mx-auto px-5 flex flex-col items-center">
            <div className="relative w-20 h-10">
              <Image
                src={"/tmdb_logo.svg"}
                alt={"TMDB Logo"}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm text-center">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
