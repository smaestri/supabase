import ListBooksForm from "@/components/list-books-form";
import { ListBooksProps } from "./page";
import { createClient } from "@/utils/supabase/server";
export type BookWithCategoryAndUser = any

export default async function ListBooks({ searchParams }: ListBooksProps) {
  let category: any = null
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if(!user?.id){
    return <div>Please connect</div>
   }
   console.log('List book of not userId' + user?.id + "with cat " + searchParams.categoryId)
  const { data: userBooks } = await supabase
    .from("user_book")
    .select("*, user!inner(*), book!inner(*, category!inner(*))")
    .neq("user_id", user?.id)
    .eq("book.category_id", searchParams.categoryId);
    console.log(userBooks?.length + " books found :" + JSON.stringify(userBooks))

    console.log('userBooks', userBooks)

    const finalBooks = userBooks?.map(item => ({id : item.id, state: item.state, price: item.price, bookInfo:item.book, userInfo: item.user}))

  return (<>
    <h1 className="text-2xl">Books for category "{category?.name}"</h1>
    <ListBooksForm userId={user?.id} books={finalBooks} />
  </>
  )
}

