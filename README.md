# Book Link
An aesthetically-pleasing tool for ethically linking to books.

<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>

## The Problem
I saw this interesting viewpoint from [Richard Stallman's website](https://stallman.org/amazon.html):
> "If you want to use a URL to identify a book, please don't use an Amazon page! Doing so promotes Amazon."

Personally, I agree with this viewpoint. Who wants to promote big tech and billionaires when sharing links to books?
However, most people wouldn't take the time to find another way.
## The Solution
A simple, aesthetically-pleasing way to share books that promotes ethical and small booksellers over billion-dollar megacorps.
This is a Next.JS based website for doing just that.
## Using
This app is quite easy-to-use! Just go to [booklnk.me](https://booklnk.me) and type in the name or ISBN of a book. It will create a page with all of the book's information, as well as links to buy it. The shortlink it gives you can be easily shared to others, allowing for a convienent, aesthetic, and ethical way to share books!
### Self-hosting
You'll need a PostgreSQL database to run this app.
1. Environment Variables
In your installation method, add the following environment variables:
- `NEXT_PUBLIC_DMCA_EMAIL`: An email address for people to send DMCA complaints, as required by Google Books to use their API. Only used on the privacy policy.
- `GOOGLE_BOOKS_KEY`: An API key for Google Books.
- `DATABASE_URL`: A PostgreSQL connection string in the format of `postgres://<user>:<password>@<host>:<port>/<database>`.
(more info to come soon)