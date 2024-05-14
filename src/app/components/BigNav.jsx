import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link className="font-bold text-inherit" href="/">
          FooFest
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="festival">
            Bands
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="schedule" aria-current="page">
            Schedule
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="map">
            Map
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Favorites</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="../pages/ticket-frontpage" variant="flat">
            Tickets
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
