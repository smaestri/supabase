import ListBooksForm from "@/components/list-books-form";
import { ListBooksProps } from "./page";
import { createClient } from "@/utils/supabase/server";

// const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
//   include: { category: true, user: true },
// })
// export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategory>

export type BookWithCategoryAndUser =any

export default async function ListBooks({ searchParams }: ListBooksProps) {
  // let books: BookWithCategoryAndUser[] = []
  let category: any = null
  const supabase = createClient();
   const { data: books } = await supabase.from("books").select("*, category(*)").eq("category_id", searchParams.categoryId);

  // const session = await auth();
  // books = await db.book.findMany({
  //   include: {
  //     category: true,
  //     user: true
  //   },
  //   where: {
  //     categoryId: parseInt(searchParams.categoryId),
  //   }
  // });
  // category = await db.category.findFirst({
  //   where: { id: parseInt(searchParams.categoryId) }
  // })
  return (<>
    <h1 className="text-2xl">Books for category "{category?.name}"</h1>
    <ListBooksForm userId={"123"} books={books} />
  </>
  )
}

