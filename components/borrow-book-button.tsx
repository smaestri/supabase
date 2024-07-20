import { purchaseBook } from "@/lib/actions";
import FormButton from "./form-button";
import clsx from "clsx";
import { BOOK_STATUS } from "@/lib/constants";

export function BorrowBookButton({ id, status }: { id: number, status: string }) {
    const borrowBookAction = purchaseBook.bind(null, id)
  
    return (
      <form action={borrowBookAction}>
        <FormButton disabled={status === 'BORROWED'} className={clsx(
          {
            "": status === BOOK_STATUS.FREE,
            'cursor-not-allowed': status === 'BORROWED',
          },
        )}>Borrow</FormButton>
      </form>
    );
  }
  