import { User } from "@/api";
import {
  Button,
  Input,
  Link,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onLogin: (token: string) => void;
  onSignUpClick: () => void;
}

export default function SignInModalContent(props: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitClick = async () => {
    setIsFetching(true);
    const result = await User.login(username, password);
    setIsFetching(false);

    if (!result.ok) {
      toast.error("Could not login", { autoClose: 1000 });
      return;
    }
    props.onLogin(result.data.accessToken);
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>
      <ModalBody>
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            onValueChange={(e) => setUsername(e)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            onValueChange={(e) => setPassword(e)}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Link
          className="mr-auto"
          color="primary"
          href="#"
          onClick={props.onSignUpClick}
        >
          Does not have account?
        </Link>

        <Button color="danger" variant="light" onPress={props.onClose}>
          Close
        </Button>
        <Button color="primary" onPress={onSubmitClick} isLoading={isFetching}>
          Submit
        </Button>
      </ModalFooter>
    </>
  );
}
