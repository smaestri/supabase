"use client"

import { saveCity } from "@/lib/actions"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Select, SelectItem, Textarea } from "@nextui-org/react"
import axios from "axios"
import { useState } from "react"
import FormButton from "./form-button"
import { useFormState } from "react-dom"

const ModalCity = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
  const [loading, setLoading] = useState<boolean>();
  const [cities, setCities] = useState<[string] | []>([]);
  const [selectedCity, setSelectedCity] = useState();
  const [street, setStreet] = useState<any>();
  const [radioSelected, setRadioSelected] = useState<string>("current-city");
  const [formState, action] = useFormState(saveCity.bind(null, street, selectedCity), null)

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
  console.log('radio selected', radioSelected)

  console.log('city selected', selectedCity)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <form action={action}>
            <ModalHeader className="flex flex-col gap-1">Indiquer une ville</ModalHeader>
            <ModalBody>
              <p>
                Merci de renseigner votre adresse précise SVP, qui sera le lieu de la vente avec l'acheteur
              </p>
              <Input name="cp" placeholder="code postal" onChange={cpChanged} />

              {loading && <div>Loading...</div>}
              {!loading && <Select
                isRequired
                selectionMode="single"
                label="Ville"
                onChange={(ev:any)=>setSelectedCity(ev.target.value)}
                >
                {cities.map((city: any) => (
                  <SelectItem key={city}>{city}</SelectItem>
                ))}
              </Select>}

              <Textarea
                      isRequired
                      label="Numéro et nom de la rue"
                      onValueChange={setStreet}
                      placeholder="Numéro et nom de la rue"
                    />
              <div>
                {/* <RadioGroup
                  label="Voulez-vous utliser cette adresse pour rencontrer votre acheteur?"
                  value={radioSelected}
                  onValueChange={setRadioSelected}
                >
                  <Radio value="current-city">Oui</Radio>
                  <Radio value="other-city">Non, veuillez préciser</Radio>
                  <div>
                    <Textarea
                      disabled={radioSelected==='current-city'}
                      label="Lieu de rencontre, soyez précis SVP"
                      onValueChange={setCustoAddress}
                      placeholder="Numéro, nom de la rue et ville"
                    />
                  </div>
                </RadioGroup> */}
              </div>

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