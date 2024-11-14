import type { Metadata } from "next";
import "./globals.css";

import { Source_Sans_3, Oswald } from 'next/font/google'

const sourceSansPro = Source_Sans_3({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-source-sans-pro',
})

const oswald = Oswald({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSansPro.variable} ${oswald.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
