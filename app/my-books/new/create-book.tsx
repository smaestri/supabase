import CreateEditBookForm from "@/components/create-edit-form";
import { createClient } from "@/utils/supabase/server";

export default async function CreateBook() {
  // const categories = await db.category.findMany();
   //const categories : any = []
   const supabase = createClient();
   const { data: categories } = await supabase.from("category").select();
  return (<>
  <h1 className="text-2xl">Créer un Livre</h1>
    <CreateEditBookForm categories={categories} />
  </>
  )
}
