import { TrendingBook } from "@/app/trending.module";
import db from "@/db/db";
import { trendingTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let dbCheckCache;
  try {
    dbCheckCache = await db.select().from(trendingTable);
  } catch (e) {
    console.warn("Error connecting to db:", e);
    return NextResponse.json({ error: "db_connect_error", message: "Couldn't connect to the database!" }, { status: 500 });
  }
  if (dbCheckCache && dbCheckCache.length >= 1) {
    if ((new Date().getTime() - new Date(dbCheckCache[0].cacheTime).getTime()) / (1000 * 60 * 60 * 24) <= 1) {
      const trendingBooks: TrendingBook[] = [];
      for (const book of dbCheckCache) trendingBooks.push({ id: book.googleBooksID, title: book.name, author: book.author, cover: book.cover, description: book.description });
      return NextResponse.json(trendingBooks);
    } else {
      await db.delete(trendingTable);
    }
  }
  const data = await fetch()
}