import CreateEditBookForm from "@/components/create-edit-form";
import { createClient } from "@/utils/supabase/server";

export default async function CreateBook() {
   const supabase = createClient();
   const { data: categories } = await supabase.from("category").select();
   const {data, error : errConnect} = await supabase.auth.getUser()
 
   if(!data.user?.id){
    return <div>User not found</div>
   }

  return (<>
  <h1 className="text-2xl">Créer un Livre</h1>
    <CreateEditBookForm categories={categories} userId={data.user?.id} />
  </>
  )
}
