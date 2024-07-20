"use client"
import { BorrowWithBook } from "@/app/sales/page";
import { closePurchase, refusePurchase, validatePurchase } from "@/lib/actions";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import ModalMessages from "./ModalMessages";

export default function ListPurchases({sales, isPurchase}: any) {
console.log('sales', sales)
const [modalOpen, setModalOpen] = useState(false);

return (<div>
    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
      <table className="min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Title
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              {isPurchase ? "Vendeur": "Acheteur"}
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Heure et lieu du RDV
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Prix
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Messages
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
             Statut
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sales?.map((sale: BorrowWithBook) => (
            <tr
              key={sale.book_id}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex items-center gap-3">
                  {sale.user_book.book.title}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-3">
              {isPurchase? sale.user_book.user.user_name: "buyer_name"}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
              {sale.rdv_date} - {sale.rdv_time} à {sale.user_book.user.city}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
              {sale.user_book.price}
              </td>
              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <Button onClick={()=> setModalOpen(true)}>Voir les messages</Button>
              </td>
              {sale.status === 'PENDING' && isPurchase  && <div>Attente de validation du vendeur</div>}
              {sale.status === 'PENDING' && !isPurchase  && <Button onClick={()=>validatePurchase(sale.id)}>Accepter</Button>}
              {sale.status === 'PENDING' && !isPurchase && <Button onClick={()=>refusePurchase(sale.id, sale.user_book.id)}>Refuser</Button>}
              {sale.status === 'VALIDATED' && isPurchase &&  <Button onClick={()=>closePurchase(sale.id, sale.user_book.id)}>Cloturer</Button>}

            </tr>
          ))}
        </tbody>
      </table>
      <ModalMessages isOpen={!!modalOpen} onClose={() => { setModalOpen(false) }} />

    </div>
  </div>
  )
}