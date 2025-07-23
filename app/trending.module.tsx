"use client"
import { ReactNode, useState } from "react";

export default function Trending(): ReactNode {
  const [trending, setTrending] = useState<TrendingBook[] | null>(null)
  fetch("/api/trending")
    .then((res) => {
      if (!res || !res.ok) {
        alert ("Couldn't load trending books!");
        return null;
      }
      return res.json();
    })
    .then((res) => {
      if (!res) return null;
      setTrending(res);
    })
  return (
    <div className="">
      {trending ? trending.map((book) => <div key={book.id}>

      </div>) : <p>Loading Trending...</p>}
    </div>
  )
}
export type TrendingBook = {
  id: string,
  title: string,
  author: string,
  cover: string | null,
  description: string | null
}