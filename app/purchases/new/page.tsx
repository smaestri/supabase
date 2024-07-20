"use client"
import FormButton from "@/components/form-button"
import { purchaseBook } from "@/lib/actions"
import { Calendar, Select, SelectItem, Textarea } from "@nextui-org/react"
import { useState } from "react"

const Borrow = ({ searchParams }: { searchParams: any }) => {

  const [firstDate, setFirstDate] = useState<any>({
    day: "",
    month: "",
    year: ""
  })
  const [message, setMessage] = useState<any>();

  console.log('searchParams', searchParams)
  console.log('firstDate', firstDate)
  console.log('message', message)

  const rdv = new Date(firstDate.year, firstDate.month, firstDate.day).toDateString();
  return (
    <div className="row">
      <h1>Acheter un livre</h1>
      <form action={purchaseBook.bind(null, searchParams?.bookId as number,
        rdv, message
      )}>
        <input type="hidden" value="toto" name="test" />
        <p>La vente aura lieu au domicile du vendeur, l'adresse proécise vosu sera communiquée au moment de la valdiation par le vendeur. </p>
        <p>
          Merci de renseigner un créneaux pour rencontrer le vendeur et procéder à la vente ou au don.
        </p>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col">
            <Choice title="premier choix" timeFieldName="firstTime" setDate={setFirstDate} />
          </div>
        </div>
        <div>Ajouter un message au vendeur  <Textarea
          label="Description"
          name="message"
          onValueChange={setMessage}
          placeholder="Message au vendeur"
        /></div>
        <FormButton>Valider ma demande</FormButton>
      </form>
    </div>
  )
}


const Choice = ({ title, setDate, timeFieldName }: { title: string, setDate: any, timeFieldName: string }) => {

  const times = [
    { id: '10_to_12', label: '10h à midi' },
    { id: '12_to_14', label: '12h à 14h' },
    { id: '14_to_16', label: '14h à 16h' },
    { id: '16_to_18', label: '16h à 18h' },
    { id: '18_to_20', label: '18h à 20h' },
    { id: '20_to_22', label: '20h à 22h' }

  ]

  return (<>
    <div>{title}</div>
    <div><Calendar aria-label="Date (No Selection)" onChange={setDate} /></div>
    <div>
      <Select
        label="Time"
        items={times}
        name={timeFieldName}>
        {(time: any) => (
          <SelectItem key={time.id} value={time.id} >{time.label}</SelectItem>
        )}
      </Select>
    </div>
  </>)
}



export default Borrow;