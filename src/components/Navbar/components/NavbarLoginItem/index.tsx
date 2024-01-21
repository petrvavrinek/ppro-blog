import AuthModal from "@/components/AuthModal";
import { Button, NavbarItem } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NavbarLoginItem = () => {
  const [isLoginModal, setLoginModal] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavbarItem className="hidden lg:flex">
        <Button
          as={Link}
          onClick={() => {
            setLoginModal(true);
            setIsOpen(true);
          }}
        >
          Sign in
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Button
          as={Link}
          color="primary"
          href="#"
          variant="flat"
          onClick={() => {
            setLoginModal(false);
            setIsOpen(true);
          }}
        >
          Sign Up
        </Button>
      </NavbarItem>
      <AuthModal
        isOpen={isOpen}
        isLoginModal={isLoginModal}
        onViewChange={(e) => setLoginModal(e)}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
