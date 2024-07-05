import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, Image } from "@nextui-org/react";
import SearchInput from "./search-input";
import AccountPage from "./account-page";

export default function Header() {
  console.log('loading header')
  return (
    <Navbar isBordered maxWidth={'full'}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <Image />
            <p className="hidden sm:block font-bold text-inherit">Sharebook</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <SearchInput />
        <AccountPage />
      </NavbarContent>
    </Navbar>
  )
}