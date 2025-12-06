import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lubina Blanca - Authentic Mediterranean Seafood Restaurant in Tangier",
  description: "Experience the finest Mediterranean cuisine with fresh seafood and traditional recipes in Tangier, Morocco. Visit Lubina Blanca for an unforgettable dining experience. Open 24 hours.",
  keywords: ["restaurant", "Mediterranean", "seafood", "fine dining", "Tangier", "Morocco", "Lubina Blanca", "fresh fish", "paella", "couscous"],
  openGraph: {
    title: "Lubina Blanca - Authentic Mediterranean Seafood Restaurant in Tangier",
    description: "Experience the finest Mediterranean cuisine with fresh seafood and traditional recipes in Tangier, Morocco. Open 24 hours.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
