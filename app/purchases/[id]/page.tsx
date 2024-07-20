import { createClient } from "@/utils/supabase/server";

interface PurchaseProps {
    params: {
        id: string
    }
}

export default async function Purchases(props: PurchaseProps) {
    const supabase = createClient();
    const {data, error : errConnect} = await supabase.auth.getUser()
    if (errConnect) {
      return <div>Connectez-vous SVP.</div>
    }
    // load purchase
    const { data: purchase } = await supabase
    .from("borrow")
    .select("*, user_book(*, user!inner(*), book!inner(*, category!inner(*)))")
    .eq("id", props.params.id)

return(<><div>Détail de l'achat / vente</div><div>{JSON.stringify(purchase)}</div></>)

}
