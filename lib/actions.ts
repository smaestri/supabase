'use server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod"
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import * as cheerio from 'cheerio';
import { BookWithCategory } from "@/app/list-books/page";

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

const saveUser = async (supabase: any, userId: any, userName: string) => {
    console.log('saving user with id ', userId , " and name " + userName)
    let { data: user } = await supabase
        .from("user")
        .select("*").eq("user_id", userId);

    if (user == null || user.length == 0) {
        const { error: userError } = await supabase
            .from('user')
            .insert({
                user_id: userId,
                user_name: userName
            })
        console.log('error when saving user ', userError)
    }
}

export const saveCity = async (formState: any, formData: any) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    console.log('save city with city ', formData.get('city') + " and cp " + formData.get('cp') )

    const { error: errorCity } = await supabase
    .from('user')
    .update({
        cp: formData.get('cp'),
        city: formData.get('city'),
    })
    .eq('user_id', user?.id)


    if(errorCity) {
        console.log('error when updating city / cp')
        return 'KO';
    }
    return 'OK';





}


const saveBook = async (supabase: any, formData: any) => {

    const isbn = formData.get('isbn')
    console.log('saving book with isbn', isbn, " title:", formData.get('title'), " author" + formData.get('author'))

    let { data: bookWithCategory } = await supabase
        .from("book")
        .select("*").eq("isbn", isbn);

    if (!bookWithCategory || bookWithCategory.length == 0) {
        console.log('book not found, inserting')
        const { error } = await supabase
            .from('book')
            .insert({
                isbn,
                title: formData.get('title'),
                author: formData.get('author'),
                category_id: formData.get('category'),
                image: formData.get('image'),
            })
        
            if (error) {
                console.log('error when savingbook', error)
                return
            }

        let { data } = await supabase
            .from("book")
            .select("*").eq("isbn", isbn);
            console.log('data', data)
            if (error) {
                console.log('error when getting book', error)
                return
            }
            return data[0];
    }
    console.log('book already exists returning ', bookWithCategory[0])

    return bookWithCategory[0]

}

const attachBookToUser = async (supabase: any, isbn: string, userId: any, state: string | null, price: number) => {
    let { data: bookWithCategory } = await supabase
        .from("user_book")
        .select("*")
            .eq("user_id", userId)
            .eq("book_isbn", isbn);
    if (!bookWithCategory || bookWithCategory.length == 0) {
        console.log('user_book not found, inserting with isbn', isbn, " and userId " + userId,  " and state " + state ,  " and price ", price)
        const { error } = await supabase
            .from('user_book')
            .insert({
                book_isbn: isbn,
                user_id: userId,
                state,
                price

            })
        console.log('error when saving user_book ', error)
    }
}


export async function createBook(formState: CreateBookFormState, formData: FormData): Promise<CreateBookFormState> {
    const supabase = createClient();

    console.log('create' + formData.get('isbn') + formData.get('title') + formData.get('author')  + formData.get('category') + formData.get('image'))
    const { data: { user } } = await supabase.auth.getUser();

console.log('user retrieved from oauth', (JSON.stringify(user)))

    try {
        await saveUser(supabase, user?.id, user?.user_metadata["full_name"])
        const book: BookWithCategory = await saveBook(supabase, formData)
        console.log('book inserted', book)
        console.log('isbn', book.isbn)
        await attachBookToUser(supabase, book.isbn, user?.id, formData.get('state') as string,  formData.get('price') as string)
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

export async function deleteBook(id: number) {

    console.log('deleting user book with id ' + id)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
        .from('user_book')
        .delete()
        .eq('id', id)

    // console.log('delete book')
    // const book: any = {}
    // if (book?.status === "BORROWED") {
    //     return {
    //         message: "The book is currently being borrowed, you can't delete it!"
    //     }

    // }

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


    console.log('add with book' + bookId)

    const supabase = createClient();
    const { data, error: errConnect } = await supabase.auth.getUser()
    console.log('add with user' + data?.user?.id)

    const { error } = await supabase
        .from('borrow')
        .insert({
            borrower_id: data?.user?.id,
            book_id: bookId
        })


    console.log('error', error)

    const { error: errorBOok } = await supabase
        .from('books')
        .update({
            status: "BORROWED",
        })
        .eq('id', bookId)

    revalidatePath('/borrows')
    redirect('/borrows')
}

export async function closeBorrow(bookId: number, borrowId: number) {
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
    const supabase = createClient();

    const { error: errorBook } = await supabase
        .from('books')
        .update({
            status: "FREE",
        })
        .eq('id', bookId)

    const { error: errorBorrow } = await supabase
        .from('borrow')
        .update({
            close_date: new Date().toISOString()
        })
        .eq('id', borrowId)

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