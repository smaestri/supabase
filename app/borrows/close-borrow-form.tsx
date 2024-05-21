import FormButton from "@/components/form-button"
import { closeBorrow } from "@/lib/actions"

export default function CloseBorrowForm({ bookId }: { bookId: number }) {
    const closeBorrowAction = closeBorrow.bind(null, bookId)

    return (
        <form action={closeBorrowAction}>
            <FormButton>Close</FormButton>
        </form>
    )

}