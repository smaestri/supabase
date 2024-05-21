'use server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod"
import { createClient } from "@/utils/supabase/server";

const createBookSchema = z.object({
    title: z.string().min(3).regex(/^[a-z]+$/, { message: "Must be lowercase" }),
    author: z.string().min(3),
    category: z.string()
})

interface CreateBookFormState {
    errors: {
        title?: string[];
        author?: string[];
        _form?: string[];
    }
}

// export async function signIn() {
//     return auth.signIn("github")
// }

// export async function signOut() {
//     return auth.signOut()
// }

export async function createBook(formState: CreateBookFormState, formData: FormData): Promise<CreateBookFormState> {
    // const session = await auth.auth()
    // if (!session || !session.user) {
    //     return {
    //         errors: {
    //             _form: ["Please login"]
    //         }
    //     }
    // }

    console.log('title' + formData.get('title'))

    const result = createBookSchema.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        category: formData.get('category')

    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let book: any = {};
    const supabase = createClient();

    try {

        const { error } = await supabase
  .from('books')
  .insert({ 
    title: result.data.title,
    author: result.data.author,
    category_id: result.data.category
   })

   console.log('error', error)

        // book = await db.book.create({
        //     data: {
        //         title: result.data.title,
        //         author: result.data.author,
        //         categoryId: parseInt(result.data.category),
        //         userId: session.user.id
        //     }
        // })
        book = {}
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }
    }
    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function updateBook(bookId: number, formState: CreateBookFormState, formData: FormData): Promise<CreateBookFormState> {
    // const session = await auth.auth()
    // if (!session || !session.user) {
    //     return {
    //         errors: {
    //             _form: ["Please login"]
    //         }
    //     }
    // }

    console.log('tutu')

    const result = createBookSchema.safeParse({
        title: formData.get('title'),
        author: formData.get('author'),
        category: formData.get('category')
    })

    console.log('result', JSON.stringify(result))
    console.log('result.success', result.success)
    console.log('bookId', bookId)


    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let book: any;

        const supabase = createClient();

        const { error } = await supabase
  .from('books')
  .update({ 
    title: result.data.title,
    author: result.data.author,
    category_id: result.data.category,
   })
  .eq('id', bookId)
    // } catch (err: unknown) {
    //     if (err instanceof Error) {
    //         return {
    //             errors: {
    //                 _form: [err.message]
    //             }
    //         }
    //     } else {
    //         return {
    //             errors: {
    //                 _form: ['Something went wrong']
    //             }
    //         }
    //     }
    // }

    console.log('error', error)

    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function deleteBook(id: number) {
    // check if book already borrowed
    // const book = await db.book.findFirst({
    //     where: {
    //         id
    //     }
    // })
    console.log('delete book')
    const book : any= {}
    if (book?.status === "BORROWED") {
        return {
            message: "The book is currently being borrowed, you can't delete it!"
        }

    }
    const supabase = createClient();

    const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id)

    console.log('error', error)

    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function borrowBook(bookId: number) {
    // const session = await auth.auth()
    // if (!session || !session.user) {
    //     return
    // }
    // TODO
    // await db.borrow.create({
    //     data: {
    //         bookId,
    //         borrowerId: session.user.id
    //     }
    // })
    // await db.book.update({
    //     where: { id: bookId },
    //     data: {
    //         status: "BORROWED"
    //     }
    // })
    revalidatePath('/borrows')
    redirect('/borrows')
}

export async function closeBorrow(bookId: number) {
    //TODO
    
    // await db.borrow.deleteMany({
    //     where: {
    //         bookId,
    //     }
    // })
    // await db.book.update({
    //     where: { id: bookId },
    //     data: {
    //         status: "FREE"
    //     }
    // })
    revalidatePath('/borrows')
    redirect('/borrows')
}

export async function search(formData: FormData) {
    const term = formData.get('term')
    if (typeof term !== 'string' || !term) {
        redirect("/")
    }
    redirect(`/search?term=${term}`)
}