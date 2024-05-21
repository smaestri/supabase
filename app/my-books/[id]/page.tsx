// import { db } from "@/lib/db"
import { notFound } from "next/navigation"

interface BookProps {
    params: {
        id: string
    }
}

export default async function Book(props: BookProps) {

    // const book = await db.book.findFirst({
    //     where: { id: parseInt(props.params.id) }
    // })

    // const cat = await db.category.findFirst({
    //     where: { id: book?.categoryId }
    // })

    const book : any= {}
    const cat : any = {}


    if (!book) {
        return notFound();
    }
    return <div>{book.id} - {book.title}- {book.author} - {cat?.name}</div>
}

// export async function generateStaticParams() {
//     const books = await db.book.findMany();

//     return books.map((book) => {
//         return {
//             id: book.id.toString(),
//         };
//     });
// }