import { Suspense } from "react";
import BookCreateLoading from "@/components/book-create-loading";
import EditBook from "./edit-book";

interface EditBookProps {
    params: {
        id: string
    }
}

export default async function EditBookSuspense(props: EditBookProps) {
    return <div>
        <Suspense fallback={<BookCreateLoading />}>
            <EditBook params={props.params}/>
        </Suspense>
    </div>

}
