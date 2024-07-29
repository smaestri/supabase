import PurchaseClient from "./purchase-client";
import { createClient } from "@/utils/supabase/server";

export default async function Purchase({sale, isPurchase}: {sale: any, isPurchase: boolean}) {
    const supabase = createClient();
    const { data: messages } = await supabase
    .from("messages")
    .select("*, user(*)")
    .eq("borrow_id", sale.id)

    let buyerName
    if(!isPurchase) {
        const { data: buyer } = await supabase
        .from("user")
        .select("user_name")
        .eq("user_id", sale.borrower_id)

        buyerName=buyer[0].user_name

    }
    
    console.log('messages', messages)
    console.log('buyerName', buyerName)

    return(<PurchaseClient sale={sale} isPurchase={isPurchase} buyer={buyerName} messages={messages} />)
    
}
