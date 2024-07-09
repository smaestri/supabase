"use client"

import { saveCity } from "@/lib/actions"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import axios from "axios"
import { useState } from "react"
import FormButton from "./form-button"
import { useFormState } from "react-dom"

const ModalCity = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
  const [loading, setLoading] = useState<boolean>();
  const [cities, setCities] = useState<[string] | []>([]);
  const [formState, action] = useFormState(saveCity, null)

  console.log('formState', formState)
  if (formState === 'OK') {
    onClose();
  }
  const cpChanged = async (event: any) => {
    if (event.target.value.length === 5) {
      console.log('event.target.value', event.target.value)
      const url = `http://localhost:3000/api/geo?cp=${event.target.value}`

      try {
        setLoading(true)
        const response = await axios.get(url)
        console.log('response 2', response)
        if (response && response.data && response.data.cities) {
          const theCities = response.data.cities.map((item: any) => (item.nomCommune))
          setCities(theCities)
        }
      } catch (error) {
        console.log('err' + JSON.stringify(error))
      } finally {
        setLoading(false)
      }
    }
  }

  console.log('cities', cities)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <form action={action}>
            <ModalHeader className="flex flex-col gap-1">Indiquer une ville</ModalHeader>
            <ModalBody>
              <p>
                Merci de renseigner votre code postal et ville, afin de vous connecter aux personnes qui habitent proches de chez vous
              </p>
              <Input name="cp" placeholder="code postal" onChange={cpChanged} />

              {loading && <div>Loading...</div>}
              {!loading && <Select
                isRequired
                label="Ville"
                name="city">
                {cities.map((city: any) => (
                  <SelectItem key={city}>{city}</SelectItem>
                ))}
              </Select>}

            </ModalBody>


            {!loading && <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
              <FormButton>
                Valider
              </FormButton>
            </ModalFooter>}
          </form>
        )}
      </ModalContent>
    </Modal>)
}

export default ModalCity;