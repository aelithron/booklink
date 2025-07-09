import BookForm from "./bookForm.module";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 md:p-20">
      <div className="text-center flex flex-col">
        <h1 className="text-5xl font-semibold mb-1">BookLink</h1>
        <p className="mb-4 italic">An aesthetically-pleasing tool for ethically linking to books</p>
      </div>
      <BookForm />
    </div>
  );
}