import { BorrowWithBook } from "@/app/sales/page";
import Purchase from "./purchase";

export default function ListPurchases({ sales, isPurchase }: any) {
  console.log('sales', sales)

  return (
    <div>

      {sales?.map((sale: BorrowWithBook) => (
        <Purchase sale={sale} isPurchase={isPurchase} />
      ))}

    </div>
  )
}