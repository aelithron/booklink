"use client"
import { TrendingBook } from "./page";

export function Trending({ books }: { books: string }) {
  const trending = JSON.parse(books) as TrendingBook[];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
      {trending.map((book) => <button key={book.title} onClick={() => window.location.href = `/?search=${book.title}`} className="grid grid-cols-5 p-2 border-slate-500 border-2 rounded-xl gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.cover || "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"} alt="Book cover" className="rounded-lg" width={100} height={240} />
        <div className="flex flex-col col-span-4 text-start">
          <h1 className="text-xl font-semibold">{book.title}</h1>
          <h2 className="text-lg italic">{book.author}</h2>
          <p>{book.description}</p>
        </div>
      </button>)}
    </div>
  )
}