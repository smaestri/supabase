"use client"

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@nextui-org/react"
import FormButton from "./form-button"
import { refusePurchase } from "@/lib/actions"
import { useState } from "react"

const ModalRefus = ({ isOpen, onClose, sale }: { isOpen: boolean, onClose: any, sale: any }) => {

  const allMotifs = [
    { id: 'INCORRECT_SLOT', label: "Je ne suis pas disponible au créneau proposé" },
    { id: 'OTHER', label: "Autre" }
  ]

  const [motif, setMotif] = useState();
  const [slot, setSlot] = useState<any>();
  console.log('motif', motif)

  console.log('slot', slot)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <form action={refusePurchase.bind(null, sale.id, sale.user_book.id, motif, slot)}>
            <ModalHeader className="flex flex-col gap-1">Motif du refus</ModalHeader>
            <ModalBody>

              <Select
                isRequired
                selectionMode="single"
                label="Motif du refus"
                onChange={(ev: any) => setMotif(ev.target.value)}
              >
                {allMotifs.map((motif: any) => (
                  <SelectItem key={motif.id}>{motif.label}</SelectItem>
                ))}
              </Select>

              {motif === "INCORRECT_SLOT" && <Textarea
                isRequired
                label="Indiquer un créneau disponible"
                onValueChange={setSlot}
                placeholder="Date et heure ou vous etes disponible"
              />}

            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
              <FormButton>
                Valider
              </FormButton>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>)
}

export default ModalRefus;