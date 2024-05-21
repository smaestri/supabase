"use client"
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "@/components/form-button";
import { BookWithCategory } from "@/app/my-books/page";
import React from "react";
import { createBook, updateBook } from "@/lib/actions";

interface CreateEditBookFormProps {
  book?: BookWithCategory
  // categories: Category[]
  categories: any
}

export default function CreateEditBookForm({ categories, book }: CreateEditBookFormProps) {
  // need to transform ID in string to display Select correctly
  //const categoriesFormatted = categories.map((cat: any) => ({ ...cat, id: cat.id.toString() }))

  const getAction = () => {
    if (book) {
      return updateBook.bind(null, book.id);
    }
    return createBook
  }

  const [formState, action] = useFormState(getAction(), {
    errors: {}
  })

  return (
    // <div className="flex max-w-md">
      <form action={action}>
        <div className="space-y-4">
          <div>title: {formState.errors.title}</div>
          <div>author: {formState.errors.author}</div>
          {/* <input name="title"></input>
          <input name="author"></input> */}

        {/*isinvalid causing issue */}
          <Input name="title"
            // isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(', ')}
            defaultValue={book ? book.title : undefined} />
          <Input name="author"
            // isInvalid={!!formState.errors.author}
            errorMessage={formState.errors.author?.join(', ')}
            defaultValue={book ? book.author : undefined} />
          {/* do not put correct name for test in SA not working*/}
          <Select
            label="Category"
            defaultSelectedKeys={book?.category.id ? [book.category.id.toString()] : undefined}
            items={categories} name="category">
            {(category: any) => (
              <SelectItem key={category.id} value={category.id} >{category.name}</SelectItem>
            )}
          </Select>
          <FormButton>Save</FormButton>
          {formState.errors._form ? <div className="p-2 bg-red-200 border border-red-400">{formState.errors._form?.join(', ')}</div> : null}
        </div>
      </form>
    // </div>
  )
}
