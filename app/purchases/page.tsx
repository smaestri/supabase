import { createClient } from "@/utils/supabase/server";
import ListPurchases from "@/components/list-purchases";
import { BORROW_STATUS } from "@/lib/constants";

export type BorrowWithBook = any

export default async function Purchases() {
  const supabase = createClient();
  const {data, error : errConnect} = await supabase.auth.getUser()
  if (errConnect) {
    return <div>Connectez-vous SVP.</div>
  }

  const { data: purchases } = await supabase
  .from("borrow")
  .select("*, user_book(*, user!inner(*), book!inner(*, category!inner(*)))")
  .eq("borrower_id", data.user.id)
  .in("status", [BORROW_STATUS.PENDING, BORROW_STATUS.VALIDATED, BORROW_STATUS.CANCELLED])
  .is('close_date', null)
  .order('created_at', { ascending: false })

  // todo retrieve buyer name
  if (!purchases || purchases.length === 0) {
    return <div>Pas d'emprunt en cours</div>
  }

  console.log('purchases', JSON.stringify(purchases))
  return <ListPurchases sales={purchases} isPurchase={true} />

}