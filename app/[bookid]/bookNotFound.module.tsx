import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BookNotFound() {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold mb-2">Not Found</h1>
      <p>The book you searched for couldn&apos;t be found!</p>
      <Link href={"/"} className="items-center bg-slate-500 border-slate-700 border-2 px-2 py-1 rounded-lg"><FontAwesomeIcon icon={faHome} className="mr-1" /> Go Home</Link>
    </div>
  );
}