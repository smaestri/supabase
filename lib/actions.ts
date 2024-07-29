'use server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod"
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import * as cheerio from 'cheerio';
import { BookWithCategory } from "@/app/list-books/page";
import { BOOK_STATUS, BORROW_STATUS } from "./constants";

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
    console.log('saving user with id ', userId, " and name " + userName)
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

export const saveCity = async (street: any, selectedCity: any, formState: any, formData: any) => {

    console.log('save city with city ', selectedCity + " and cp " + formData.get('cp') + ' street', street)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error: errorCity } = await supabase
        .from('user')
        .update({
            cp: formData.get('cp'),
            city: selectedCity,
            street,
        })
        .eq('user_id', user?.id)


    if (errorCity) {
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

const attachBookToUser = async (supabase: any, isbn: string, userId: any, state: string | null, price: string | null) => {
    let { data: bookWithCategory } = await supabase
        .from("user_book")
        .select("*")
        .eq("user_id", userId)
        .eq("book_isbn", isbn);
    if (!bookWithCategory || bookWithCategory.length == 0) {
        console.log('user_book not found, inserting with isbn', isbn, " and userId " + userId, " and state " + state, " and price ", price)
        const { error } = await supabase
            .from('user_book')
            .insert({
                book_isbn: isbn,
                user_id: userId,
                state,
                price,

            })
        console.log('error when saving user_book ', error)
    }
}


export async function createBook(formState: CreateBookFormState, formData: FormData): Promise<CreateBookFormState> {
    const supabase = createClient();

    console.log('create' + formData.get('isbn') + " " + formData.get('title') + " " + formData.get('author') + " " + formData.get('category') + " " + formData.get('place') + " " + formData.get('image'))
    const { data: { user } } = await supabase.auth.getUser();

    console.log('user retrieved from oauth', (JSON.stringify(user)))

    try {
        await saveUser(supabase, user?.id, user?.user_metadata["full_name"])
        const book: BookWithCategory = await saveBook(supabase, formData)
        await attachBookToUser(supabase, book.isbn, user?.id, formData.get('state') as string, formData.get('price'))
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

    //check if borrow attached
    let { data: borrow } = await supabase
        .from("user_book")
        .select("*")
        .eq("id", id)
        .eq("status", "PURCHASED");

    if (borrow && borrow.length > 0) {
        console.log('error book pending!!', borrow)
        return {
            message: "The book is currently being borrowed, you can't delete it!"
        }
    }


    const { error } = await supabase
        .from('user_book')
        .update({
            deleted: true,
        })
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

export async function validatePurchase(purchaseId: number, street: any) {

    // TODO only if PENDING
    console.log('validatePurchase', purchaseId)
    const supabase = createClient();

    const { data: { user }, error: errConnect } = await supabase.auth.getUser()

    if (street) {
        console.log('updating street ', street)
        const { error: errorValidatre } = await supabase
            .from('user')
            .update({
                street,
            })
            .eq('user_id', user?.id)

        if (errorValidatre) {
            console.log('error during street update')
        }

    }
    const { error: errorValidatre } = await supabase
        .from('borrow')
        .update({
            status: BORROW_STATUS.VALIDATED,
        })
        .eq('id', purchaseId)

    if (errorValidatre) {
        console.log('error during borrows update')
    }

    revalidatePath('/sales')
    redirect('/sales')
}

export async function refusePurchase(purchaseId: number, bookId: number, motif: any, slot: any) {
    // TODO only if PENDING
    console.log('refusePurchase', purchaseId, " book=", bookId, " motif= ", motif, " slot= " + slot)
    const supabase = createClient();
    const { data: { user }, error: errConnect } = await supabase.auth.getUser()

    if (motif == "INCORRECT_SLOT") {
        const { error: errorMessage } = await supabase
            .from('messages')
            .insert({
                borrow_id: purchaseId,
                user_id: user?.id,
                message: "Le créneau ne me convient pas, pouvez-vous refaire la demande sur ce créneau SVP: " + slot
            })
    }

    const { error: errorValidatre } = await supabase
        .from('borrow')
        .update({
            status: BORROW_STATUS.CANCELLED,
        })
        .eq('id', purchaseId)

    setBookToFree(bookId, supabase)

    revalidatePath('/sales')
    redirect('/sales')
}


export async function purchaseBook(bookId: number, rdvDate: any, message: string, formData: FormData) {

    console.log('formdata with message ', message)

    const supabase = createClient();
    const { data, error: errConnect } = await supabase.auth.getUser()
    console.log('borrow book' + bookId + "and user" + data?.user?.id + "and first date" + rdvDate + "and first time" + formData.get("firstTime"))

    const { data: borrow, error } = await supabase
        .from('borrow')
        .insert({
            borrower_id: data?.user?.id,
            book_id: bookId,
            rdv_date: rdvDate,
            rdv_time: formData.get("firstTime")
        })
        .select()

    if (error) {
        console.log('error during borrow: ', error)
        return; //todo error management
    }


    // need to retrieve id
    console.log('new borrow ID=' + JSON.stringify(borrow))

    console.log('insertign message with borrow_id', borrow[0].id, " user_id ", data?.user?.id, " message ", message)

    const { error: errorMessage } = await supabase
        .from('messages')
        .insert({
            borrow_id: borrow[0].id,
            user_id: data?.user?.id,
            message
        })

    if (errorMessage) {
        console.log('error during inserting message ', error)
        return; //todo error management
    }


    const { error: errorBOok } = await supabase
        .from('user_book')
        .update({
            status: BOOK_STATUS.PURCHASED,
        })
        .eq('id', bookId)

    if (errorBOok) {
        console.log('error during updating book status: ', error)
        return; //todo error management
    }


    revalidatePath('/purchases')
    redirect('/purchases')
}

export async function closePurchase(borrowId: number, bookId: number) {

    const supabase = createClient();
    const { error: errorBorrow } = await supabase
        .from('borrow')
        .update({
            status: BORROW_STATUS.CLOSED,
            close_date: new Date().toISOString()
        })
        .eq('id', borrowId)

    setBookToFree(bookId, supabase)

    revalidatePath('/purchases')
    redirect('/purchases')
}



const setBookToFree = async (bookId: any, supabase: any) => {

    const { error: errorBook } = await supabase
        .from('user_book')
        .update({
            status: BOOK_STATUS.FREE,
        })
        .eq('id', bookId)

}

export async function search(formData: FormData) {
    const term = formData.get('term')
    if (typeof term !== 'string' || !term) {
        redirect("/")
    }
    redirect(`/search?term=${term}`)
}

export async function addMessage(borrowId: any, message: string, isPurchase: any) {
    const supabase = createClient();
    const { data, error: errConnect } = await supabase.auth.getUser()

    const { error: errorMessage } = await supabase
        .from('messages')
        .insert({
            borrow_id: borrowId,
            user_id: data?.user?.id,
            message
        })


    if (isPurchase) {
        revalidatePath('/purchases')
        redirect('/purchases')
    } else {
        revalidatePath('/sales')
        redirect('/sales')
    }



}