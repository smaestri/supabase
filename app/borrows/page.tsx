import { createClient } from "@/utils/supabase/server";
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
  const supabase = createClient();
  const {data, error : errConnect} = await supabase.auth.getUser()
  if (errConnect) {
    return <div>Connectez-vous SVP.</div>
  }
  const { data: borrows } = await supabase
  .from("borrow")
  .select("*, book(*)")
  .eq("borrower_id", data.user.id)
  .is('close_date', null)

  if (!borrows || borrows.length === 0) {
    return <div>Pas d'emprunt en cours</div>
  }

  return (<div>
    <h1 className="text-2xl">Mes emprunts</h1>{borrows.length}
    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
      <table className="min-w-full text-gray-900 md:table">
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
              key={borrow.book_id}
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
                  <p>{borrow.book_id}: {borrow.books.title}</p>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {borrow.books.author}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                {borrow.books.userId}
              </td>

              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                  <CloseBorrowForm bookId={borrow.book_id} borrowId={borrow.id} />
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