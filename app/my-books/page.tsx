import BookCreateLoading from "@/components/book-create-loading";
import { Suspense } from "react";
import MyBooks from "./my-books";

// const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
//   include: { category: true },
// })
// export type BookWithCategory = Prisma.BookGetPayload<typeof booksWithCategory>

export type BookWithCategory = any

export default async function MyBooksPage() {
  return (<Suspense fallback={<BookCreateLoading />}>
    <MyBooks />
  </Suspense>)
}

