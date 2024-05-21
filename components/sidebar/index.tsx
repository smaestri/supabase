import Link from "next/link";
import Counter from "./counter";
import { createClient } from "@/utils/supabase/server";

export default async function SideBar() {
  const supabase = createClient();
  const { data: categories, error } = await supabase.from("category").select();
  if (!categories) {
    return null;
  }

  const renderCategories = categories.map((cat: any) => {
    return (
      <div key={cat.id}>
        <Link href={{ pathname: `/list-books`, query: { categoryId: cat.id } }} >
          {cat.name}
          {/* (<Counter categoryId={cat.id} />) */}
        </Link></div>)
  })
  return (<div className="flex flex-col">
    {renderCategories}
  </div>
  )
}
