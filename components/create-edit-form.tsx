"use client"
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "@/components/form-button";
import { BookWithCategory } from "@/app/my-books/page";
import React from "react";
import { createBook, updateBook } from "@/lib/actions";
import { Category } from "@prisma/client";


interface CreateEditBookFormProps {
  book?: BookWithCategory
  categories: Category[]
}

export default function CreateEditBookForm({ categories, book }: CreateEditBookFormProps) {
  // need to transform ID in string to display Select correctly
  const categoriesFormatted = categories.map(cat => ({ ...cat, id: cat.id.toString() }))

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
          <Input name="title" label="Title"
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(', ')}
            defaultValue={book ? book.title : undefined} />
          <Input name="author" label="Author"
            isInvalid={!!formState.errors.author}
            errorMessage={formState.errors.author?.join(', ')}
            defaultValue={book ? book.author : undefined} />
          {/* do not put correct name for test in SA not working*/}
          <Select
            label="Category"
            defaultSelectedKeys={book?.categoryId ? [book.categoryId.toString()] : undefined}
            items={categoriesFormatted} name="category">
            {(category) => (
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
