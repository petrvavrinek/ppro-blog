import { ApiTokenContext } from "@/contexts/api-token.context";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useContext } from "react";
import { toast } from "react-toastify";
import SignInModalContent from "./SignInModalContent";
import SignUpModalContent from "./SignUpModalContent";

interface Props {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onViewChange: (isLogin: boolean) => void;
  isLoginModal?: boolean;
}

export default function AuthModal(props: Props) {
  const tokenContextData = useContext(ApiTokenContext);

  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: props.isOpen,
    onOpen: props.onOpen,
    onClose: props.onClose,
  });

  return (
    <Modal isOpen={isOpen} onClose={onOpenChange} className="transition-all">
      <ModalContent>
        {(onClose) =>
          props.isLoginModal ? (
            <SignInModalContent
              onClose={onClose}
              onSignUpClick={() => props.onViewChange(false)}
              onLogin={(token) => {
                tokenContextData.setToken(token, new Date());
                onClose();
              }}
            />
          ) : (
            <SignUpModalContent
              onClose={onClose}
              onSignInClick={() => props.onViewChange(true)}
              onRegister={() => {
                toast("Registered");
                onClose();
              }}
            />
          )
        }
      </ModalContent>
    </Modal>
  );
}
