import { borrowBook } from "@/lib/actions";
import FormButton from "./form-button";
import clsx from "clsx";

export function BorrowBook({ id, status }: { id: number, status: string }) {
    const borrowBookAction = borrowBook.bind(null, id)
  
    return (
      <form action={borrowBookAction}>
        <FormButton disabled={status === 'BORROWED'} className={clsx(
          {
            "": status === 'FREE',
            'cursor-not-allowed': status === 'BORROWED',
          },
        )}>Borrow</FormButton>
      </form>
    );
  }
  