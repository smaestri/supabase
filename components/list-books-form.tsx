import Image from "next/image"
import { BookWithCategoryAndUser } from "../app/list-books/list-books";
import { BorrowBook } from "./borrow-book-button";
import { UpdateBook } from "./update-book-button";
import { DeleteBook } from "./delete-book-button";

interface ListBooksFormProps {
  // books: BookWithCategoryAndUser[]
  books: any
  userId?: string

}

export default function ListBooksForm({ books, userId }: ListBooksFormProps) {
  return (<>

    <div className="flex flex-wrap gap-4 mt-5 mb-5">
      {books?.map((userBook: any) => (
        <div
          key={userBook.bookInfo.id}
          className="flex flex-col w-[200px]"
        >
          <div className="flex flex-col items-center">
            <div className="h-[150px]">
              <Image
                src={userBook.bookInfo.image}
                alt={`${userBook.bookInfo.title}`}
                width={100}
                height={100}
              />
            </div>
            <div className="h-[85px]">
              <p title={userBook.bookInfo.title} className="line-clamp-3 font-sans">{userBook.bookInfo.title}</p>
            </div>
          </div>
          <div>Auteur: {userBook.bookInfo.author}</div>
          <div>Catégorie: {userBook.bookInfo.category.name}</div>
          <div>Propriétaire: {userBook.userInfo.user_id}</div>
          <div>Statut:{" "}
            {userBook.status === 'FREE' ? (
              <span>
                Libre
              </span>
            ) : null}
            {userBook.status === 'BORROWED' ? (
              <span>
                Déjà Emprunté
              </span>
            ) : null}
          </div>
          <div className="flex flex-col items-center mt-2">
            {userId && userBook.userInfo.user_id !== userId &&
              <BorrowBook id={userBook.bookInfo.id} status={userBook.bookInfo.status} />}
          </div>
          <div className="">
            {userId && userBook.userInfo.user_id === userId &&
              <div className="flex flex-col items-center gap-2">
                <div>
                  <UpdateBook id={userBook.bookInfo.id} />
                </div>
                <div>
                  <DeleteBook id={userBook.bookInfo.id} />
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







