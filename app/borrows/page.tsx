import CloseBorrowForm from "./close-borrow-form";

// const borrowWithBook = Prisma.validator<Prisma.BorrowDefaultArgs>()({
//   include: {
//     book: true,
//     borrower: true
//   },
// })
// export type BorrowWithBook = Prisma.BorrowGetPayload<typeof borrowWithBook>
export type BorrowWithBook = any

export default async function Borrows() {
  // const session = await auth();
  // if (!session || !session.user) {
  //   return <div>Please sign-in</div>
  // }
  // const borrows: BorrowWithBook[] = await db.borrow.findMany({
  //   include: {
  //     borrower: true,
  //     book: true
  //   },
  //   where: {
  //     borrowerId: session.user.id
  //   }
  // })
  const borrows: BorrowWithBook[] = []


  if (!borrows || borrows.length === 0) {
    return <div>Pas d'emprunt en cours</div>
  }

  return (<div>
    <h1 className="text-2xl">Mes emprunts</h1>
    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Title
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Author
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Lender
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {borrows?.map((borrow: BorrowWithBook) => (
            <tr
              key={borrow.bookId}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  {/* <Image
                  // src={book.image_url}
                  src="toto"
                  className="rounded-full"
                  width={28}
                  height={28}
                  alt={`${book.title}`}
                /> */}
                  <p>{borrow.bookId}: {borrow.book.title}</p>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {borrow.book.author}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {borrow.book.userId}
              </td>

              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <CloseBorrowForm bookId={borrow.bookId} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}