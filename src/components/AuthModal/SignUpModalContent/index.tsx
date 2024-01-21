import { User } from "@/api";
import {
  Button,
  CircularProgress,
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
  onRegister: () => void;
  onSignInClick: () => void;
}

export default function SignUpModalContent(props: Props) {
  const [isFetching, setIsFetching] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async () => {
    setIsFetching(true);
    const result = await User.register(username, password);
    setIsFetching(false);

    if (!result.ok)
      return toast.error("Could not register", { autoClose: 1000 });

    props.onRegister();
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
      <ModalBody>
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            value={username}
            onValueChange={(e) => setUsername(e)}
            type="text"
            label="Username"
            placeholder="Enter your new username"
          />
          <Input
            value={email}
            onValueChange={(e) => setEmail(e)}
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            value={password}
            onValueChange={(e) => setPassword(e)}
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
          <Input
            value={password2}
            onValueChange={(e) => setPassword2(e)}
            type="password"
            label="Password again"
            placeholder="Enter your password again"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Link
          className="mr-auto"
          color="primary"
          href="#"
          onClick={props.onSignInClick}
        >
          Already have account?
        </Link>
        <Button color="danger" variant="light" onPress={props.onClose}>
          Close
        </Button>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <Button color="primary" onPress={onSubmit}>
            Submit
          </Button>
        )}
      </ModalFooter>
    </>
  );
}
