export default async function Page({ params }: { params: Promise<{ bookid: string }> }) {
  const bookID = (await params).bookid;
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-8 md:p-20 gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl text-center">Book Info</h1>
        <p>ID: {bookID}</p>
      </div>
      <div className="flex flex-col gap-2 text-xl">
        <a href="google.com" className="bg-slate-500 border-slate-700 border-2 text-center p-2 rounded-2xl">Temp button</a>
      </div>
    </main>
  );
}