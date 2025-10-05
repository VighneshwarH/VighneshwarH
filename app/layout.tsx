// If you need client-side features, uncomment the next line:
// "use client";
import type { Metadata } from "next";
import { Pacifico, Outfit } from "next/font/google";

import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const outfit = Outfit({
  display:"swap",
  subsets:["latin"]
})

export const metadata: Metadata = {
  title: "Vighneshwar H | Portfolio",
  description: "Created by Vighneshwar H",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="shortcut icon"
          href="https://image2url.com/images/1759576677251-9d91bcf9-d375-4b48-bdc8-0ac009cb3bf5.png"
          type="image/x-icon"
        />
      </head>
      <body
        className={`${pacifico.variable}${outfit.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
