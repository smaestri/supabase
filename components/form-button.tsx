"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@nextui-org/react"
import { ReactNode } from "react"

interface FormButtonProps {
  children: ReactNode
  disabled?: boolean
  className?: string
}

export default function FormButton({ children, className, disabled = false }: FormButtonProps) {
  const { pending } = useFormStatus();
  return <Button
            type="submit" className={className} isDisabled={disabled} isLoading={pending}>
    {children}
  </Button>
}

