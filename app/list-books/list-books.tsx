import ListBooksForm from "@/components/list-books-form";
import { ListBooksProps } from "./page";
import { createClient } from "@/utils/supabase/server";
import { useUserContext } from "../AuthProvider";

// const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
//   include: { category: true, user: true },
// })
// export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategory>

export type BookWithCategoryAndUser = any

export default async function ListBooks({ searchParams }: ListBooksProps) {
  // let books: BookWithCategoryAndUser[] = []
  let category: any = null
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user?.id){
    return <div>Please connect</div>
   }
  const { data: books } = await supabase
    .from("books")
    .select("*, category(*)")
    .neq("user_id", user?.id)
    .eq("category_id", searchParams.categoryId);

  return (<>
    <h1 className="text-2xl">Books for category "{category?.name}"</h1>
    <ListBooksForm userId={user?.id} books={books} />
  </>
  )
}

