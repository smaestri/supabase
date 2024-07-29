"use client"
import { closePurchase, validatePurchase } from "@/lib/actions";
import { Button, Image} from "@nextui-org/react";
import { useState } from "react";
import Messages from "./Messages";
import ModalRefus from "./ModalRefus";
import { times } from "@/app/purchases/new/page";

export default function PurchaseClient({ sale, messages, isPurchase, buyer }: { buyer?: any, sale: any, messages: any, isPurchase: boolean }) {
  const [street, setStreet] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const streetChanged = (event: any) => {
    console.log('changed', event.target.value)
    setStreet(event.target.value)
  }

  const displayTime = (id: any)=> {
    return times
      .filter((item: any) => item.id == id)[0].label
  }
  

  return (<>      
    <h1>Demande d'achat le {new Date(sale.created_at).toLocaleDateString("fr-FR")}</h1>
    <div className="flex flex-row mb-10">
      <div className="w-[300px] items-center">
        <div className="h-[150px]" title={sale.user_book.book.title}>
                <Image
                  src={sale.user_book.book.image}
                  alt={`${sale.user_book.book.title}`}
                  width={100}
                  height={100}
                />
        </div>
        <div>
          {isPurchase ? `Vendu par ${sale.user_book.user.user_name}` : `Acheteur: ${buyer}`}
        </div>
        <div>
          Vous avez RDV le {new Date(sale.rdv_date).toLocaleDateString("fr-FR")} de {displayTime(sale.rdv_time)} {isPurchase ? `à ${sale.user_book.user.street} ${sale.user_book.user.city} `:"A mon adresse"}
        </div>
        <div> Prix: {sale.user_book.price}
        </div>
        <div> Statut: {sale.status}
        </div>
        <div>
          {sale.status === 'PENDING' && isPurchase && <div>Attente de validation du vendeur</div>}
          {sale.status === 'PENDING' && !isPurchase && <div><Button isDisabled={!street && !sale.user_book.user.street} onClick={() => validatePurchase(sale.id, street)}>Accepter</Button></div>}
          {sale.status === 'PENDING' && !isPurchase && <div><Button onClick={() => setModalOpen(true)}>Refuser</Button></div>}
          {sale.status === 'VALIDATED' && isPurchase && <div><Button onClick={() => closePurchase(sale.id, sale.user_book.id)}>Cloturer</Button></div>}
        </div>
      </div>
      <Messages messages={messages} borrowId={sale.id} isPurchase={isPurchase} />
      <ModalRefus isOpen={modalOpen} onClose={() => { setModalOpen(false) }} sale={sale} />
    </div>
    </>
  )
}
