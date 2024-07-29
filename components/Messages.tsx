"use client"

import { Button, Textarea } from "@nextui-org/react"
import { useState } from "react"
import { addMessage } from "@/lib/actions"

const Messages = ({ messages, borrowId, isPurchase }: { messages: any,borrowId: any, isPurchase: any }) => {
  const [message, setMessage] = useState<any>();

  const renderMessages = () => {

    return messages.map((mess: any) => <div>
      <div>Posté le {mess.created_at} par {mess.user.user_name}</div>
      <div>{mess.message}</div>
    </div>)

  }
  return (<div>
    <form>
      {renderMessages()}
      <Textarea
        label="Description"
        name="message"
        onValueChange={setMessage}
        placeholder="Message au vendeur"
      />
      <Button onClick={() => addMessage(borrowId, message, isPurchase)}>Ajouter message</Button>
    </form></div>)
}

export default Messages;