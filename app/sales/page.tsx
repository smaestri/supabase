import ListPurchases from "@/components/list-purchases";
import { BORROW_STATUS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";

export type BorrowWithBook = any

export default async function Sellings() {
  const supabase = createClient();
  const {data, error : errConnect} = await supabase.auth.getUser()
  if (errConnect) {
    return <div>Connectez-vous SVP.</div>
  }

  console.log('ventes pour user ' + data.user.id)
  const { data: sales } = await supabase
  .from("borrow")
  .select("*, user_book(*, user!inner(*), book!inner(*, category!inner(*)))")
  .neq("borrower_id", data.user.id)
  .eq("status", BORROW_STATUS.PENDING)
  .is('close_date', null)

  if (!sales || sales.length === 0) {
    return <div>Pas de ventes en cours</div>
  }

  console.log('sales', JSON.stringify(sales))

  return <ListPurchases sales={sales} isPurchase={false} />
 
}