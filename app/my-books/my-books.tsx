import Link from "next/link";
import ListBooksForm from "@/components/list-books-form";
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";

// const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
//   include: { category: true, user: true },
// })
// export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategory>

 export type BookWithCategoryAndUser = any

export default async function MyBooks() {
  //let books: BookWithCategoryAndUser[];
  // const session = await auth();
  // if (!session || !session.user) {
  //   return <div>Connectez-vous SVP.</div>
  // }
  const supabase = createClient();
    const { data: books, error } = await supabase.from("books").select("*, category(*)");
    // const { data: books } = await supabase.from("books").select();
 // books = []
  // books = await db.book.findMany({
  //   where: {
  //     userId: session.user.id
  //   },
  //   include: {
  //     category: true,
  //     user: true
  //   }
  // });
  return (
    <>
      <h1 className="text-2xl">Mes livres</h1>
      <ListBooksForm userId={"123"} books={books} />
      <Link href="my-books/new">
        <Button>Créer un livre</Button>
      </Link>
    </>
  )
}


