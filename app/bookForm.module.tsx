"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function BookForm() {
  const [book, setBook] = useState<string>("");
  return (
    <div className="flex flex-col items-center">
      <label className="text-sm font-semibold mb-1">Book title or ISBN:</label>
      <div className="items-center space-x-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input value={book} onChange={(e) => setBook(e.target.value)} placeholder="Search..." className="bg-slate-500 border-2 border-slate-700 rounded-lg px-2 py-1" />
      </div>
      <p className="dark:text-slate-400 text-slate-700 text-sm pt-1">(powered by Google Books)</p>
      <AutocompleteForm bookSearch={book} />
    </div>
  );
}

function AutocompleteForm({ bookSearch }: { bookSearch: string }): ReactNode {
  const router = useRouter();
  const [bookData, setBookData] = useState<AutoCompletedBook[]>();
  function selectBook(id: string) {
    fetch(`/api/create`, { method: "POST", body: JSON.stringify({ id: id }) })
      .then((res) => {
        if (!res) {
          alert("Error resolving book!");
          return null;
        }
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          alert(`Error resolving book: ${res.message} (${res.error})`);
          return;
        }
        router.push(`/${res.id}`);
      });
  }
  useEffect(() => {
    if (!bookSearch || bookSearch === "") return;
    const timeout = setTimeout(() => {
      fetch(`${window.location.origin}/api/autocomplete`, {
        method: "POST",
        body: JSON.stringify({ search: bookSearch }),
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          setBookData(
            jsonRes ? jsonRes.filter(
              (book: AutoCompletedBook, index: number, self: AutoCompletedBook[]) => index === self.findIndex((b) => b.id === book.id)
            ) : []);
        });
    }, 750);
    return () => clearTimeout(timeout);
  }, [bookSearch]);
  if (!bookSearch || bookSearch === "") return;
  if (!bookData || bookData.length < 1) return <p className="flex flex-col p-2 bg-slate-500 border-2 mt-4 rounded-xl border-slate-700">Loading...</p>
  return (
    <div className="flex flex-col p-2 bg-slate-500 border-2 mt-4 rounded-xl border-slate-700">
      {bookData.map((book) => <div key={book.id}>
        <button onClick={() => selectBook(book.id)} className="grid grid-cols-5 p-1 items-center w-[80vw] md:w-[40vw]">
          <img src={book.cover} width={60} height={200} />
          <div className="col-span-4 flex flex-col">
            <h2 className="text-lg font-semibold">{truncateTitle(book.title)}</h2>
            <h3>{book.author}</h3>
          </div>
        </button>
      </div>)}
    </div>
  )
}
export type AutoCompletedBook = {
  id: string,
  cover: string,
  title: string,
  author: string
}
export function truncateTitle(text: string): string {
  if (text == null) return "";
  const maxLength = 35;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}