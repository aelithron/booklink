import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Link from "next/link";
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
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="flex bg-slate-300 dark:bg-slate-800 md:px-16 p-4 justify-between">
      <Link href={`/`} className="underline hover:text-sky-500">Home</Link>
      <a href={`mailto:${process.env.NEXT_PUBLIC_DMCA_EMAIL}`} className="underline hover:text-sky-500">Contact</a>
      <Link href={`/terms`} className="underline hover:text-sky-500">Terms</Link>
    </footer>
  )
}