"use client"

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import { useState } from "react"
import FormButton from "./form-button"

const ModalMessages = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
  const [loading, setLoading] = useState<boolean>();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <form>
            <ModalHeader className="flex flex-col gap-1">Messages</ModalHeader>
            <ModalBody>
              
            </ModalBody>


            {!loading && <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>

            </ModalFooter>}
          </form>
        )}
      </ModalContent>
    </Modal>)
}

export default ModalMessages;