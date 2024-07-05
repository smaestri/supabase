"use client"
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "@/components/form-button";
import { BookWithCategory } from "@/app/my-books/page";
import React, { useState } from "react";
import { createBook } from "@/lib/actions";
import axios from "axios";
import * as cheerio from 'cheerio';

export interface Category {
  id: number;
  name: string
}

export interface CreateEditBookFormProps {
  book?: BookWithCategory
  categories: Category[]
  userId: string
}

export default function CreateEditBookForm({ categories, book, userId }: CreateEditBookFormProps) {
  // need to transform ID in string to display Select correctly
  //const categoriesFormatted = categories.map((cat: any) => ({ ...cat, id: cat.id.toString() }))

  const [fetchedBook, setFetchedBook] = useState<BookWithCategory>();
  const [loading, setLoading] = useState<boolean>();

  const [formState, action] = useFormState(createBook, {
    errors: {}
  })

  const onIsbnChanged = async (event: any) => {
    setLoading(true)
    setFetchedBook(undefined)
    let isbn : string= event.target.value;
    console.log('isbn', isbn)
    isbn = isbn.replace("-", "")
    const url = `http://localhost:3000/api?isbn=${isbn}`

    try {
      const response = await axios.get(url)
      setFetchedBook(response.data)
    } catch (error) {
      console.log('err' + JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }

  const renderBook = () => {

    return (<>
      Titre: {fetchedBook?.title} <br />
      Author: {fetchedBook?.author}
      <img src={fetchedBook?.image} />

      <Select
        label="Category"
        defaultSelectedKeys={book?.category.id ? [book.category.id.toString()] : undefined}
        items={categories} name="category">
        {(category: any) => (
          <SelectItem key={category.id} value={category.id} >{category.name}</SelectItem>
        )}
      </Select>
    </>)

  }

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <form action={action}>
      <div>
        <input name="title" type="hidden" value={fetchedBook?.title}></input>
        <input name="author" type="hidden" value={fetchedBook?.author}></input>
        <input name="image" type="hidden" value={fetchedBook?.image}></input>
        <Input name="isbn" onChange={onIsbnChanged} value={fetchedBook?.isbn} />
      </div>
      <div>
        {fetchedBook && renderBook()}
      </div>
      <FormButton>Save</FormButton>
      {formState.errors._form ? <div className="p-2 bg-red-200 border border-red-400">{formState.errors._form?.join(', ')}</div> : null}

    </form>
  )
}
