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
import { Resolver, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onRegister: () => void;
  onSignInClick: () => void;
}

type FormValues = {
  username: string;
  password: string;
  password2: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username
      ? {
          username: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

export default function SignUpModalContent(props: Props) {
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = async (data: {
    username: string;
    password: string;
    password2: string;
  }) => {
    if (data.password != data.password2) return;

    setIsFetching(true);
    const result = await User.register(data.username, data.password);
    setIsFetching(false);

    if (!result.ok)
      return toast.error("Could not register", { autoClose: 1000 });

    props.onRegister();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
        <ModalBody>
          <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              {...register("username")}
              type="text"
              label="Username"
              placeholder="Enter your new username"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
            />
            <Input
              {...register("password")}
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <Input
              {...register("password2")}
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
          <Button type="submit" isLoading={isFetching}>
            Submit
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}
