"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookForm() {
  const router = useRouter();
  const [book, setBook] = useState<string>('');
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/" + book);
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <label className="text-sm font-semibold mb-1">Book title or ISBN:</label>
      <input value={book} onChange={(e) => setBook(e.target.value)} className="bg-slate-500 border-2 border-slate-700 rounded-lg mb-3" />
      <button type="submit" className="bg-slate-500 border-slate-700 border-2 rounded-xl px-2 py-1 hover:text-sky-500">Generate Page</button>
    </form>
  );
}