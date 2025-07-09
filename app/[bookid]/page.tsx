import { Book } from "@/booklink";
import { Metadata } from "next";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import noBookCover from "@/public/noBookCover.svg"

export const metadata: Metadata = {
  title: "View Book",
}

export default async function Page({ params }: { params: Promise<{ bookid: string }> }) {
  const bookID = (await params).bookid;
  const rawResponse = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookID}?key=${process.env.GOOGLE_BOOKS_KEY}`);
  if (!rawResponse.status.toString().startsWith('2')) {
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
  const jsonResponse = await rawResponse.json();
  const isbn13 = jsonResponse.volumeInfo.industryIdentifiers?.find(
    (id: { type: string; identifier: string }) => id.type === "ISBN_13"
  )?.identifier || "Unknown ISBN";

  const book: Book = {
    name: jsonResponse.volumeInfo.title,
    isbn: isbn13,
    cover: jsonResponse.volumeInfo.imageLinks?.thumbnail
  } as Book;

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8 md:p-20 gap-4">
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="font-semibold text-2xl">Book Info</h1>
        <img alt="Book cover" src={book.cover ? book.cover : noBookCover} width={400} height={640} />
        <p className="font-semibold text-xl">{book.name}</p>
        <p>Description: Coming Soon</p>
        <p className="text-slate-500">ISBN: {book.isbn}</p>
      </div>
      <div className="flex flex-col gap-2 text-xl">
        <a href={`https://www.google.com/search?q=${bookID}`} className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl">Temp button</a>
      </div>
    </main>
  );
}