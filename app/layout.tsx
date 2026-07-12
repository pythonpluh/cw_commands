import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CW // CMDS",
  description:
    "complete list of all combat warriors commands with all the information you need about them",
  applicationName: "combat warriors Commands",

  openGraph: {
    title: "CW // CMDS",
    description:
      "complete list of all combat warriors commands with all the information you need about them",

    type: "website",
    siteName: "combat warriors commands",
  },

  twitter: {
    card: "summary",
    title: "CW // CMDS",
    description:
      "complete list of all combat warriors commands with all the information you need about them",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
