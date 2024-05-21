// import { db } from "@/lib/db"

export default async function Counter({ categoryId }: { categoryId: number | undefined }) {
    // const countBook = await db.book.aggregate({
    //     where: { categoryId: categoryId },
    //     _count: {
    //         _all: true,
    //     },
    // })
    const countBook : any = {}

    return (`${countBook._count._all} books`)

}