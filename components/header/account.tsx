"use client"
import React from 'react';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation'

interface AccountProps {
  avatarSrc?: string
  mail?: string
}

export default function Account({ avatarSrc, mail }: AccountProps) {
  const router = useRouter()

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  return (
    <>
    <Button>LOGIN WITH GITHUB</Button>
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          name={mail}
          size="sm"
          src={avatarSrc}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => {
        if (key === "logout") {
          // signOut();
          router.push("/")
        }
      }}>
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{mail}</p>
        </DropdownItem>
        <DropdownItem href="/my-books">Mes livres</DropdownItem>
        <DropdownItem href="/borrows">Mes emprunts</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </>

  )
}
