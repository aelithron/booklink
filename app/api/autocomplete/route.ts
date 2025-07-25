import { AutoCompletedBook } from "@/app/bookForm.module";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  if (!body) return NextResponse.json({ error: "missing_body", message: "The request doesn't have a body!" }, { status: 400 });
  if (!body.search || (body.search as string).trim().length < 1) return NextResponse.json({ error: "missing_search", message: "Missing or invalid search!" }, { status: 400 });
  const rawAPIRequest = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${body.search.replaceAll(" ", "+")}&key=${process.env.GOOGLE_BOOKS_KEY}&fields=kind,items(id,kind,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks)`);
  if (!rawAPIRequest) return NextResponse.json({ error: "server_fetch_error", message: "Couldn't contact the Google Books API!" }, { status: 500 });
  const apires = await rawAPIRequest.json();
  const currentBookData: AutoCompletedBook[] = [];
  if (!apires || !apires.items) return NextResponse.json([]);
  for (const item of apires.items) {
    if (item.kind !== "books#volume") continue;
    let cover;
    if (item.volumeInfo.imageLinks) {
      if (item.volumeInfo.imageLinks.thumbnail) {
        cover = item.volumeInfo.imageLinks.thumbnail;
      } else if (item.volumeInfo.imageLinks.smallThumbnail) {
        cover = item.volumeInfo.imageLinks.smallThumbnail;
      } else {
        cover = "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png";
      }
    } else {
      cover = "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png";
    }
    let authors: string = "";
    if (item.volumeInfo.authors) {
      const authorArray = (item.volumeInfo.authors as string[]);
      authors = authorArray.join(', ');
    } else authors = "Author Unknown";
    currentBookData.push({ id: item.id, cover, title: item.volumeInfo.title, author: authors });
  }
  return NextResponse.json(currentBookData);
}