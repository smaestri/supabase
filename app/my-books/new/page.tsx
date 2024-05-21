import { Suspense } from "react";
import BookCreateLoading from "@/components/book-create-loading";
import CreateBook from "./create-book";

export default async function Home() {
 
  return (<>
    <h1 className="text-2xl">Create a book</h1>
    <Suspense fallback={<BookCreateLoading />}>
      <CreateBook />
    </Suspense>
  </>
  )
}
