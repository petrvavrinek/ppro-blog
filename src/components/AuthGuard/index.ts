import { UserContext } from "@/contexts/user.context";
import { PropsWithChildren, useContext } from "react";

type Props = {
  fallback?: React.ReactNode;
} & PropsWithChildren;

const AuthGuard = (props: Props) => {
  const userProvider = useContext(UserContext);
  return userProvider?.user ? props.children : props.fallback;
};

export default AuthGuard;
