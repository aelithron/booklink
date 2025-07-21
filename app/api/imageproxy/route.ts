import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const placeholderCover = (await fetch("https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png")).body;
  const id = req.nextUrl.searchParams.get("id");
  if (!id || id.trim().length < 1) return new NextResponse(placeholderCover, { status: 400 });
  const rawAPIRequest = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_KEY}&fields=kind,volumeInfo/imageLinks`);
  if (!rawAPIRequest || !rawAPIRequest.ok) return new NextResponse(placeholderCover, { status: 500 });
  const book = await rawAPIRequest.json();
  const coverURL = getCoverURL(book.volumeInfo.imageLinks);
  let cover;
  if (coverURL) {
    cover = (await fetch(coverURL)).body;
  } else {
    cover = placeholderCover;
  }
  return new NextResponse(cover);
}

function getCoverURL(allCoverLinks: CoverLinks): string | null {
  let cover: string | null;
  switch (true) {
    /*
      // Extra large and large are just excessively big since I scale images down
      // I left them here just in case I want them later, though :3 - nova
      case !!allCoverLinks.extraLarge:
        cover = allCoverLinks.extraLarge;
        break;
      case !!allCoverLinks.large:
        cover = allCoverLinks.large;
        break;
    */
    case !!allCoverLinks.medium:
      cover = allCoverLinks.medium;
      break;
    case !!allCoverLinks.small:
      cover = allCoverLinks.small;
      break;
    case !!allCoverLinks.thumbnail:
      cover = allCoverLinks.thumbnail;
      break;
    case !!allCoverLinks.smallThumbnail:
      cover = allCoverLinks.smallThumbnail;
      break;
    default:
      cover = null;
      break;
  }
  return cover;
}
type CoverLinks = {
  extraLarge: string | undefined
  large: string | undefined
  medium: string | undefined
  small: string | undefined
  thumbnail: string | undefined
  smallThumbnail: string | undefined
}