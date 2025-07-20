"use client";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useState } from "react";

export default function BookForm() {
  const router = useRouter();
  const [book, setBook] = useState<string>('');
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/" + book);
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <label className="text-sm font-semibold mb-1">Book title or ISBN:</label>
      <div className="flex gap-1">
        <input value={book} onChange={(e) => setBook(e.target.value)} className="bg-slate-500 border-2 border-slate-700 rounded-lg px-2 py-1" />
        <button type="submit" className="bg-slate-500 border-slate-700 border-2 rounded-xl px-2 py-1 hover:text-sky-500"><FontAwesomeIcon icon={faArrowRight} /></button>
      </div>
      <AutocompleteForm bookSearch={book} />
    </form>
  );
}

function AutocompleteForm({ bookSearch }: { bookSearch: string }): ReactNode {
  const [bookData, setBookData] = useState<AutoCompletedBook[]>();
  useEffect(() => {
    if (!bookSearch || bookSearch === "") return;
    fetch(`${window.location.origin}/api/autocomplete`, { method: "POST", body: JSON.stringify({ search: bookSearch }) })
      .then((res) => res.json())
      .then((jsonRes) => {
        setBookData(jsonRes);
      })
  }, [bookSearch]);
  if (!bookSearch || bookSearch === "" || !bookData) return null;
  return (
    <div className="flex flex-col p-2 bg-slate-500 border-2 mt-4 rounded-xl border-slate-700">
      {bookData.map((book) => <div key={book.id} className="grid grid-cols-5 p-1 items-center">
        <img src={book.cover} width={60} height={200} />
        <div className="col-span-4 flex flex-col">
          <h2 className="text-lg">{book.title}</h2>
          <h3>{book.author}</h3>
        </div>
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