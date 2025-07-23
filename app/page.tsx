import { Metadata } from "next";
import BookForm from "./bookForm.module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import fancyBG from "./fancyBG.module.css";
import db from "@/db/db";
import { trendingTable } from "@/db/schema";
import { Trending } from "./trending.module";

export const metadata: Metadata = {
  title: "BookLink",
}

export default async function Home() {
  return (
    <div className={`flex flex-col text-center min-h-screen p-8 md:p-20 ${fancyBG.bodyBG}`}>
      <div className="flex items-center text-center justify-center gap-2">
        <FontAwesomeIcon icon={faBook} size="2xl" />
        <h1 className="text-5xl font-semibold mb-1">BookLink</h1>
      </div>
      <p className="mb-4 italic">An aesthetically-pleasing tool for ethically linking to books</p>
      <BookForm />
      <h1 className="text-2xl font-semibold mt-8">Bestselling Books</h1>
      <Trending books={JSON.stringify(await getTrendingBooks())} />
      <a href="https://developer.nytimes.com" className="flex flex-col mt-4 justify-center items-center text-center" target="_blank">
        <img src="https://developer.nytimes.com/files/poweredby_nytimes_200c.png" alt="Data from the New York Times" />
      </a>
    </div>
  );
}

export type TrendingBook = {
  title: string,
  author: string,
  cover: string | null,
  description: string | null
}
async function getTrendingBooks(): Promise<TrendingBook[]> {
  const trending: TrendingBook[] = [];
  let dbCheckCache;
  try {
    dbCheckCache = await db.select().from(trendingTable);
  } catch (e) {
    console.warn("Error connecting to db:", e);
    alert("Error connecting to the database!");
  }
  if (dbCheckCache && dbCheckCache.length >= 1) {
    if ((new Date().getTime() - new Date(dbCheckCache[0].cacheTime).getTime()) / (1000 * 60 * 60 * 24) <= 1) {
      for (const book of dbCheckCache) trending.push({ title: book.name, author: book.author, cover: book.cover, description: book.description });
      return trending;
    } else {
      await db.delete(trendingTable);
    }
  }
  const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_KEY}`);
  if (!res || !res.ok) alert("Couldn't contact the New York Times API!");
  const data = await res.json();
  const trendingBooks = data.results.books;
  for (const book of trendingBooks) {
    trending.push({ title: book.title, author: book.author, cover: book.book_image, description: book.description });
    await db.insert(trendingTable).values({ name: book.title, author: book.author, cover: book.book_image, description: book.description });
  }
  return trending;
}