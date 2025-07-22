import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
config.autoAddCss = false

const nunito = Nunito({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    template: '%s | BookLink',
    default: 'BookLink'
  },
  description: "An aesthetically pleasing, ethical way to link to books.",
  openGraph: {
    siteName: "BookLink",
    locale: "en_US",
    type: "website"
  }
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
    <footer className="flex bg-slate-300 dark:bg-slate-800 md:px-16 p-4 justify-between items-center">
      <div className="flex gap-2 items-center">
        <Link href={`/`} className="flex gap-1 items-center hover:text-sky-500 py-1 px-2 bg-slate-500 rounded-full"><FontAwesomeIcon icon={faHome} /> <p className="underline">Home</p></Link>
        <a href="https://github.com/aelithron/booklink" className="hover:text-sky-500 py-0.5 px-1 bg-slate-500 rounded-full" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
      </div>
      <Link href={`/terms`} className="underline hover:text-sky-500">Terms/DMCA</Link>
    </footer>
  )
}