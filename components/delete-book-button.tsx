"use client"
import { deleteBook } from "@/lib/actions";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import FormButton from "./form-button";

export function DeleteBook({ id }: { id: number }) {
    const deleteBookAction = deleteBook.bind(null, id)
    const [formState, action] = useFormState(deleteBookAction, { message: '' })
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    //TODO
    // useEffect(() => {
    //   if (formState.message) {
    //     onOpen()
    //   }
    // }, [formState, onOpen])
  
    return (<>
      <form action={action}>
        <FormButton>Delete</FormButton>
      </form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  The book is currently being borrowed, you cannot delete it!
                </p>
  
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    );
  }