import { Metadata } from "next";
import { faHome, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import db from "@/db/db";
import { bookTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import fancyBG from "../fancyBG.module.css"
import Image from "next/image";
import { cache } from "react";
import DescriptionModule from "./description.module";

export async function generateMetadata({ params }: { params: Promise<{ bookid: string }> }): Promise<Metadata> {
  const bookData = await loadBook((await params).bookid);
  if (bookData.length === 0) return { title: "View Book" }
  const book = bookData[0];
  return {
    title: book.name,
    description: `View information on "${book.name}" by ${book.author}, put together by BookLink (an aesthetic, ethical way to link to books).`,
    openGraph: {
      title: book.name,
      description: `View information on "${book.name}" by ${book.author}, put together by BookLink (an aesthetic, ethical way to link to books).`,
      siteName: "BookLink",
      locale: "en_US",
      type: "book",
      images: [
        {
          url: `${process.env.OPENGRAPH_ROOT}/api/imageproxy?id=${book.googleBooksID}`,
          width: 400,
          height: 640
        }
      ]
    }
  }
}

export default async function Page({ params }: { params: Promise<{ bookid: string }> }) {
  const bookData = await loadBook((await params).bookid);
  if (bookData.length === 0) {
    return (
      <div className="flex flex-col min-h-screen p-8 md:p-20 items-center gap-2">
        <h1 className="text-3xl font-semibold">Not Found</h1>
        <p>The book you searched for couldn&apos;t be found!</p>

        <Link href={"/"} className="items-center bg-slate-500 border-slate-700 border-2 px-2 py-1 rounded-lg">
          <FontAwesomeIcon icon={faHome} className="mr-1" /> Go Home
        </Link>
      </div>
    );
  }
  const book = bookData[0];
  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 min-h-screen p-8 md:p-20 gap-4 ${fancyBG.bodyBG}`}>
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="font-semibold text-2xl">Book Info</h1>
        <Image alt="Book cover" src={`/api/imageproxy?id=${book.googleBooksID}`} className="rounded-lg" width={460} height={640} />
      </div>
      <div className="flex flex-col gap-4 text-xl">
        <div className="text-center items-center">
          <p className="font-semibold text-2xl">{book.name}</p>
          <DescriptionModule desc={book.description || ""} />
        </div>
        <h3 className="text-lg font-semibold">Bookstores</h3>
        {book.isbn ?
          <a href={`https://bookshop.org/book/${book.isbn}`} target="_blank" className="bg-gradient-to-br from-violet-400 to-blue-400 dark:from-violet-600 dark:to-blue-600 border-slate-300 dark:border-slate-700 border-2 text-center p-2 rounded-2xl font-semibold"><FontAwesomeIcon icon={faStar} /> Open on Bookshop.org</a> :
          <p className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl text-slate-800 dark:text-slate-400">Not available on Bookshop.org</p>
        }
        {book.isbn ?
          <a href={`https://www.barnesandnoble.com/w/isbn?ean=${book.isbn}`} target="_blank" className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl">Open at Barnes & Noble</a> :
          <p className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl text-slate-800 dark:text-slate-400">Not available at Barnes & Noble</p>
        }
        <hr className="h-px bg-slate-300 border-0 dark:bg-slate-700" />
        <h3 className="text-lg font-semibold">Libraries</h3>
        {book.openLibraryID ?
          <a href={`https://openlibrary.org/books/${book.openLibraryID}`} target="_blank" className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl">Open on the Open Library</a> :
          <p className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl text-slate-800 dark:text-slate-400">Not available on Open Library</p>
        }
        <hr className="h-px bg-slate-300 border-0 dark:bg-slate-700" />
        <h3 className="text-lg font-semibold">Big Companies :(</h3>
        {book.googleBooksID ?
          <a href={`https://play.google.com/store/books/details?id=${book.googleBooksID}`} target="_blank" className="bg-gray-500 border-gray-700 dark:text-gray-300 text-gray-700 border-2 text-center p-2 rounded-2xl">Open on Google Books</a> :
          <p className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl text-slate-800 dark:text-slate-400">Not available on Google Books</p>
        }
        <a href={book.isbn ? `https://www.amazon.com/s?k=${book.isbn}&i=stripbooks` : `https://www.amazon.com/s?k=${book.name}&i=stripbooks`} target="_blank" className="bg-gray-500 border-gray-700 dark:text-gray-300 text-gray-700 border-2 text-center p-2 rounded-2xl">Open on Amazon</a>
        <div className="text-sm text-center text-slate-800 dark:text-slate-400">
          <p>ISBN: {book.isbn}</p>
          <p>(data provided by Google Books)</p>
        </div>
      </div>
    </main>
  );
}

const loadBook = cache(async (bookID: string) => {
  return await db.select().from(bookTable).where(eq(bookTable.id, Number.parseInt(bookID))).limit(1);
});