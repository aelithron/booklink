import { AutoCompletedBook } from "@/app/bookForm.module";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  if (!body) return NextResponse.json({ error: "missing_body", message: "The request doesn't have a body!" }, { status: 400 });
  if (!body.search || (body.search as string).trim().length < 1) return NextResponse.json({ error: "missing_search", message: "Missing or invalid search!" }, { status: 400 });
  const rawAPIRequest = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${body.search.replaceAll(" ", "+")}&key=${process.env.GOOGLE_BOOKS_KEY}&fields=kind,items(id,kind,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks)`);
  if (!rawAPIRequest) return NextResponse.json({ error: "server_fetch_error", message: "Couldn't contact the Google Books API!", }, { status: 500 });
  const apireq = await rawAPIRequest.json();
  const currentBookData: AutoCompletedBook[] = [];
  for (const item of apireq.items) {
    currentBookData.push({ id: item.id, cover: item.volumeInfo.imageLinks.thumbnail, title: item.volumeInfo.title, author: (item.volumeInfo.authors as string[]).toString() });
  }
  return NextResponse.json(currentBookData);
}