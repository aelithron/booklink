import { ReactNode } from "react";
import db from "@/db/db";
import { trendingTable } from "@/db/schema";

export default async function Trending(): Promise<ReactNode> {
  const trending = await getTrendingBooks();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
      {trending.map((book) => <div key={book.title} className="grid grid-cols-5 p-2 border-slate-500 border-2 rounded-xl gap-2">
        <img src={book.cover} alt="Book cover" className="rounded-lg" width={60} height={200} />
        <div className="flex flex-col col-span-4 text-start">
          <h1 className="text-xl">{book.title}</h1>
          <h2 className="text-lg italic">{book.author}</h2>
          <p>{book.description}</p>
        </div>
      </div>)}
    </div>
  )
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