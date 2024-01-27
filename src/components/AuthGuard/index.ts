import { ApiTokenContext } from "@/contexts/api-token.context";
import { PropsWithChildren, useContext } from "react";

type Props = {
  fallback?: React.ReactNode;
} & PropsWithChildren;

const AuthGuard = (props: Props) => {
  const tokenProvider = useContext(ApiTokenContext);
  return tokenProvider.data ? props.children : props.fallback;
};

export default AuthGuard;
