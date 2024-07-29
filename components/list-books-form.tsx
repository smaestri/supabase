"use client"
import Image from "next/image"
import { BorrowBookButton } from "./borrow-book-button";
import { DeleteBook } from "./delete-book-button";
import ModalCity from "./ModalCity";
import { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { BOOK_STATUS } from "@/lib/constants";

interface ListBooksFormProps {
  books: any
  userId?: string
  askCity?: boolean

}

export default function ListBooksForm({ books, userId, askCity }: ListBooksFormProps) {

  const [modalOpen, setModalOpen] = useState(askCity);

  // const [modalBorrowOpen, setModalBorrowOpen] = useState(false);

  console.log('books', books)
  return (<>

    <div className="flex flex-wrap gap-4 mt-5 mb-5">
      {books?.map((userBook: any) => (
        <div
          key={userBook.bookInfo.id}
          className="flex flex-col w-[300px]"
        >
          <div className="flex flex-col items-center">
            <div className="h-[150px] mb-3">
              <Image
                src={userBook.bookInfo.image}
                alt={`${userBook.bookInfo.title}`}
                width={100}
                height={100}
              />
            </div>
            <div className="h-[65px] mb-5">
              <p title={userBook.bookInfo.title} className="line-clamp-3 font-sans">{userBook.bookInfo.title}</p>
            </div>
          </div>
          <div>Auteur: {userBook.bookInfo.author}</div>
          <div>Catégorie: {userBook.bookInfo.category.name}</div>
          <div>Lieu de: {userBook.userInfo.user_name}</div>
          <div>Etat: {userBook.state}</div>
          <div>Prix: {userBook.price}</div>
          <div>Statut:{" "}
            {!userBook.status || userBook.status === BOOK_STATUS.FREE ? (
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
              <Link href={`purchases/new?bookId=${userBook.id}`}>
                <Button>Acheter</Button>
              </Link>}
          </div>
          <div className="">
            {userId && userBook.userInfo.user_id === userId &&
              <div className="flex flex-col items-center gap-2">
                <div>
                  <DeleteBook userBookId={userBook.id} />
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
    <ModalCity isOpen={!!modalOpen} onClose={() => { setModalOpen(false) }} />

  </>)

}







