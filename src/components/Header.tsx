import Link from "next/link";
import { auth } from "@/app/auth/providers";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { UserProfile } from "./user-profile";

export async function Header() {
  const session = await auth();
  const isAdmin = session?.user?.roles.includes("admin") ? true : false;

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          LIVEMODE
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {session?.user ? (
          <UserProfile
            firstName={session?.user?.firstName}
            lastName={session?.user?.lastName}
            company={session?.user?.company}
            isAdmin={isAdmin}
          />
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href="/auth/sign-in"
                className="transition hover:text-gray-500"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/request-an-account"
                variant="flat"
              >
                Request an Account
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
