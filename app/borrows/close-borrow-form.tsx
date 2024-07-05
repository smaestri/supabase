import FormButton from "@/components/form-button"
import { closeBorrow } from "@/lib/actions"

export default function CloseBorrowForm({ bookId, borrowId }: { bookId: number, borrowId: number }) {
    const closeBorrowAction = closeBorrow.bind(null, bookId, borrowId)

    return (
        <form action={closeBorrowAction}>
            <FormButton>Close</FormButton>
        </form>
    )

}