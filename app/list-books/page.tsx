import BookCreateLoading from "@/components/book-create-loading";
import { Suspense } from "react";
import ListBooks from "./list-books";

// const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
//   include: { category: true },
// })
// export type BookWithCategory = Prisma.BookGetPayload<typeof booksWithCategory>

export type BookWithCategory = any

export interface ListBooksProps{
  searchParams: {
      categoryId: string
  }
}

export default async function ListBooksPage({ searchParams }: ListBooksProps) {
  return (<Suspense fallback={<BookCreateLoading />}>
    <ListBooks searchParams={searchParams} />
  </Suspense>)
}

