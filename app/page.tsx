import { Metadata } from "next";
import BookForm from "./bookForm.module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import fancyBG from "./fancyBG.module.css";

export const metadata: Metadata = {
  title: "BookLink",
}

export default function Home() {
  return (
    <div className={`flex flex-col text-center min-h-screen p-8 md:p-20 ${fancyBG.bodyBG}`}>
      <div className="flex items-center text-center justify-center gap-2">
        <FontAwesomeIcon icon={faBook} size="2xl" />
        <h1 className="text-5xl font-semibold mb-1">BookLink</h1>
      </div>
      <p className="mb-4 italic">An aesthetically-pleasing tool for ethically linking to books</p>
      <BookForm />
    </div>
  );
}