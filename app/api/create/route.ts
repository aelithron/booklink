import db from "@/db/db";
import { bookTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  if (!body) return NextResponse.json({ error: "missing_body", message: "The request doesn't have a body!" }, { status: 400 });
  if (!body.id || (body.id as string).trim().length < 1) return NextResponse.json({ error: "missing_id", message: "Missing or invalid Google Books id!" }, { status: 400 });
  let dbCheckPreExisting;
  try {
    dbCheckPreExisting = await db.select().from(bookTable).where(eq(bookTable.googleBooksID, body.id)).limit(1);
  } catch (e) {
    console.warn("Error connecting to db:", e);
    return NextResponse.json({ error: "db_connect_error", message: "Couldn't connect to the database!" }, { status: 500 });
  }
  if (dbCheckPreExisting && dbCheckPreExisting.length >= 1) {
    if ((new Date().getTime() - new Date(dbCheckPreExisting[0].createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 14) {
      return NextResponse.json({ id: dbCheckPreExisting[0].id });
    } else {
      await db.delete(bookTable).where(eq(bookTable.googleBooksID, body.id));
    }
  }
  const rawAPIRequest = await fetch(`https://www.googleapis.com/books/v1/volumes/${body.id}?key=${process.env.GOOGLE_BOOKS_KEY}&fields=id,kind,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks,volumeInfo/industryIdentifiers`);
  if (!rawAPIRequest || !rawAPIRequest.status.toString().startsWith('2')) return NextResponse.json({ error: "server_fetch_error", message: "Couldn't contact the Google Books API!" }, { status: 500 });
  const book = await rawAPIRequest.json();
  if (book.kind !== "books#volume") return NextResponse.json({ error: "invalid_book", message: "Provided id was for a non-volume resource!" }, { status: 400 });
  let authors: string;
  if (book.volumeInfo.authors) {
    const authorArray = (book.volumeInfo.authors as string[]);
    authors = authorArray.join(', ');
  } else authors = "Author Unknown";
  const isbns = parseISBNs(book.volumeInfo.industryIdentifiers);
  const openLibraryID = await getOpenLibraryID(isbns.isbn13);
  await db.insert(bookTable).values({
    name: book.volumeInfo.title,
    googleBooksID: body.id,
    author: authors,
    isbn: isbns.isbn13,
    openLibraryID: openLibraryID
  }).execute();
  return NextResponse.json({ id: (await db.select().from(bookTable).where(eq(bookTable.googleBooksID, body.id)).limit(1))[0].id });
}

function parseISBNs(industryIdentifiers: Array<{type: string, identifier: string}> | undefined) {
  if (!industryIdentifiers || industryIdentifiers.length === 0) {
    return { isbn10: null, isbn13: null };
  }
  const result = {
    isbn10: null as string | null,
    isbn13: null as string | null
  };
  for (const item of industryIdentifiers) {
    if (item.type === "ISBN_10") {
      result.isbn10 = item.identifier;
    } else if (item.type === "ISBN_13") {
      result.isbn13 = item.identifier;
    }
  }
  return result;
}
async function getOpenLibraryID(isbn: string | null): Promise<string | null> {
  if (!isbn) return null;
  const rawReq = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
  if (!rawReq) return null;
  const body = await rawReq.json();
  if (!body || !body[`ISBN:${isbn}`]) return null;
  return ((body[`ISBN:${isbn}`])["identifiers"])["openlibrary"][0] || null;
}