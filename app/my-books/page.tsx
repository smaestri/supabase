import BookCreateLoading from "@/components/book-create-loading";
import { Suspense } from "react";
import MyBooks from "./my-books";
import { Category } from "@/components/create-edit-form";

export type BookWithCategory = {
  isbn: string;
  title: string;
  author: string;
  image: string;
  category: Category
}

export default async function MyBooksPage() {
  return (<Suspense fallback={<BookCreateLoading />}>
    <MyBooks />
  </Suspense>)
}

