import Link from "next/link";
import { auth } from "@/app/auth/providers";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { UserProfile } from "./UserProfile"

export async function Header() {
  const session = await auth()

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">LIVEMODE</Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {session?.user ? (
            <UserProfile 
              first_name={session?.user?.first_name}
              last_name={session?.user?.last_name}
              company={session?.user?.company}
              isAdmin={session?.user?.roles.includes('admin') && true}
            />
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="success" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

