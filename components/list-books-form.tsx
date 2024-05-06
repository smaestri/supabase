import Image from "next/image"
import { BookWithCategoryAndUser } from "../app/list-books/list-books";
import bookImg from '/public/book.png'
import { BorrowBook } from "./borrow-book-button";
import { UpdateBook } from "./update-book-button";
import { DeleteBook } from "./delete-book-button";

interface ListBooksFormProps {
  books: BookWithCategoryAndUser[]
  userId?: string
}

export default function ListBooksForm({ books, userId}: ListBooksFormProps) {
  return (<>
    <div className="flex flex-wrap gap-4 mt-5 mb-5">
    {books?.map((book: BookWithCategoryAndUser) => (
      <div
        key={book.id}
        className="flex flex-col"
      >
        <div className="flex flex-row justify-center">
          <Image
            src={bookImg}
            alt={`${book.title}`}
            className="rounded-full"
          />
          <div><span className="italic">{book.title}</span></div>
        </div>
        <div>Auteur: <span className="italic">{book.author}</span></div>
        <div>Catégorie: <span className="italic">{book.category.name}</span></div>
        <div>Propriétaire: <span className="italic">{book.user.email}</span></div>
        <div>Statut:{" "}
          {book.status === 'FREE' ? (
            <span className="italic">
              Libre
            </span>
          ) : null}
          {book.status === 'BORROWED' ? (
            <span className="italic">
              Déjà Emprunté
            </span>
          ) : null}
        </div>
        <div className="flex flex-col items-center mt-2">
          {userId && book.userId !== userId && 
          <BorrowBook id={book.id} status={book.status} />}
        </div>
        <div className="">
          {userId && book.userId === userId && 
          <div className="flex flex-col items-center gap-2">
            <div>
            <UpdateBook id={book.id} />
            </div>
            <div>
            <DeleteBook id={book.id} />
            </div>
          </div>
          }
        </div>
        <div>
          {!userId && <div>Connectez-vous pour emprunter!{userId}</div>}
        </div>
      </div>
    ))}
    </div>
  </>)

}







