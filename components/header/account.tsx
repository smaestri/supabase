"use client"
import React from 'react';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/actions';

interface AccountProps {
  avatarSrc?: string
  mail?: string
}

export default function Account({ avatarSrc, mail }: AccountProps) {
  const router = useRouter()

  return (
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
          signOut();
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
  )
}
