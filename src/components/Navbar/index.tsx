import { useUser } from "@/hooks/use-user";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";
import NavbarUserItem from "./components/NavbarUserItem";
import { NavbarLoginItem } from "./components/NavbarLoginItem";
import AuthGuard from "../AuthGuard";

type MenuItem = {
  title: string;
  href: string;
};

export default function App() {
  const user = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: MenuItem[] = [
    {
      title: "Latest posts",
      href: "/",
    },
    {
      title: "Most favourite posts",
      href: "/favourite",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            PPRO
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((e, i) => (
          <NavbarItem key={`${e.href}-${i}`}>
            <Link color="foreground" href={e.href}>
              {e.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <AuthGuard>
          <Button size="sm" as={Link} href="/post/create">+</Button>
        </AuthGuard>
        {user ? <NavbarUserItem /> : <NavbarLoginItem />}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
