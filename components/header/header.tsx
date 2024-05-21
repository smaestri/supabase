import Account from "./account";
import Link from "next/link";
import { Button, Navbar, NavbarBrand, NavbarContent, Image } from "@nextui-org/react";
import SearchInput from "./search-input";

export default async function Header() {
  // const session = await auth();
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
        {/* {session?.user ?  */}
        <Account
          avatarSrc={undefined}
          mail={undefined} /> :
          {/* <form action={signIn}><Button type="submit">Sign In</Button>
          </form> */}
      </NavbarContent>
    </Navbar>
  )
}