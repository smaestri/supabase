// import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { BookWithCategory } from "@/app/my-books/page";
import CreateEditBookForm from "@/components/create-edit-form";
import { createClient } from "@/utils/supabase/server";

interface EditBookProps {
    params: {
        id: string
    }
}
export default async function EditBook(props: EditBookProps) {
    // const id = parseInt(props.params.id)
    const supabase = createClient();
    const { data: bookWithCategory } = await supabase.from("books").select("*, category(*)").eq("id", props.params.id);
 
    const { data: categories } = await supabase.from("category").select();

    if (!bookWithCategory) {
        return notFound();
    }

    return (
        <>
            <h1 className="text-2xl">Modifier un Livre</h1>
            <CreateEditBookForm categories={categories} book={bookWithCategory[0]} />
        </>
    )

}
