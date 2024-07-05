import Link from "next/link";
import ListBooksForm from "@/components/list-books-form";
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import { useUserContext } from "../AuthProvider";

// const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
//   include: { category: true, user: true },
// })
// export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategory>

 export type BookWithCategoryAndUser = any

export default async function MyBooks() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user?.id){
    return <div>Please connect</div>
   }
    let { data: books, error } = await supabase
    .from("user_book")
    .select("*, user(*), book(*, category(*))")
    .eq("user_id", user?.id)
    ;
     console.log('books', books)
    if(error){
      console.log('error books fetched', error)
    }

    // let { data: test, error : er } = await supabase
    // .from("user_book")
    // .select("*, user(*), book(*, category(*))")
    // .eq("user_id", user?.id)
    // ;

    // console.log('test', test)


    const finalBooks = books?.map(item => ({bookInfo:item.book, userInfo: item.user}))


    console.log('books fetched', JSON.stringify(finalBooks))

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
      <ListBooksForm userId={user?.id} books={finalBooks} />
      <Link href="my-books/new">
        <Button>Créer un livre</Button>
      </Link>
    </>
  )
}


