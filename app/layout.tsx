import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const nunito = Nunito({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    template: '%s | Book Link',
    default: 'Book Link'
  },
  description: "An aesthetically pleasing, ethical way to link to books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
