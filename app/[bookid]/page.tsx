import { Metadata } from "next";
import { faHome, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import db from "@/db/db";
import { bookTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "View Book",
}

export default async function Page({ params }: { params: Promise<{ bookid: string }> }) {
  const bookData = await db.select().from(bookTable).where(eq(bookTable.id, Number.parseInt((await params).bookid))).limit(1);
  if (bookData.length === 0) {
    return (
      <div className="flex flex-col p-8 md:p-20 items-center gap-2">
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
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8 md:p-20 gap-4">
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="font-semibold text-2xl">Book Info</h1>
        <img alt="Book cover" src={`/api/imageproxy?id=${book.googleBooksID}`} width={400} height={640} />
        <p className="font-semibold text-xl">{book.name}</p>
        <p>Description: Coming Soon</p>
        <p className="text-slate-500">ISBN: {book.isbn}</p>
      </div>
      <div className="flex flex-col gap-2 text-xl">
        {book.isbn ?
          <a href={`https://bookshop.org/book/${book.isbn}`} target="_blank" className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl font-semibold"><FontAwesomeIcon icon={faStar} /> Open on Bookshop.org</a> :
          <p className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl text-slate-800 dark:text-slate-400">Not available on Bookshop.org</p>
        }
        <hr className="h-px my-2 bg-slate-300 border-0 dark:bg-slate-700" />
        {book.isbn ?
          <a href={`https://www.barnesandnoble.com/w/a/a?ean=${book.isbn}`} target="_blank" className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl">Open at Barnes & Noble</a> :
          <p className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl text-slate-800 dark:text-slate-400">Not available at Barnes & Noble</p>
        }
        <hr className="h-px my-2 bg-slate-300 border-0 dark:bg-slate-700" />
        {book.googleBooksID ?
          <a href={`https://play.google.com/store/books/details?id=${book.googleBooksID}`} target="_blank" className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl">Open on Google Books</a> :
          <p className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl text-slate-800 dark:text-slate-400">Not available on Google Books</p>
        }
      </div>
    </main>
  );
}