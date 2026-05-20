import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";

import { AgentationProvider } from "@/components/agentation-provider";

import "./globals.css";

const isDevelopment = process.env.NODE_ENV === "development";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cohort Cost Calculator",
  description:
    "See exactly how much you'd save with a cohort. Four quick steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${redHatDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        {children}
        {isDevelopment ? <AgentationProvider /> : null}
      </body>
    </html>
  );
}
