import { createClient } from "@/utils/supabase/server";
import SideBar from "./view";
import { useUserContext } from "@/app/AuthProvider";
export default async function SideBarPage({}) {
  const supabase = createClient();

   const { data: categories, error } = await supabase.from("category").select();
  if (!categories) {
    return null;
  }

 

  return (<SideBar categories={categories}/>)
}
