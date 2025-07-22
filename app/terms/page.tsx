import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Privacy",
}

export default function Page() {
  return (
    <div className={`flex flex-col items-center min-h-screen p-8 md:p-20`}>
      <Link href={"/"} className="bg-slate-500 border-2 border-slate-700 hover:text-sky-500 p-1 rounded-xl"><FontAwesomeIcon icon={faHome} className="mr-1" /> Go Home</Link>
      <h1 className="my-4 text-4xl font-semibold">Terms, Privacy, and DMCA</h1>
      <div className="items-start">
        <p>By using the website, you agree that your searched books will be sent to Google to help us get the book&apos;s details.</p>
        <p>You agree and understand that your IP may be logged, by us or our service providers, for security and debugging purposes.</p>
        <p>You agree to indemnify and hold harmless the website creators, maintainers, and hosters, and understand this site has no warranty or promise of uptime.</p>
        <p className="mt-2">If you need to remove any content from this site under the Digital Millenium Copyright Act, please send an email to <a href={`mailto:${process.env.NEXT_PUBLIC_DMCA_EMAIL || "about:blank"}`} className="underline hover:text-sky-500">{process.env.NEXT_PUBLIC_DMCA_EMAIL || "(email not available)"}</a> with a link to the infringing page.</p>
      </div>
    </div>
  );
}