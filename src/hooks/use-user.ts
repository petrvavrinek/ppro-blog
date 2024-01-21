import { useContext } from "react";
import { UserContext } from "../contexts/user.context";

export const useUser = () => {
  const user = useContext(UserContext);
  return user?.user;
};

export const useUserContext = () => useContext(UserContext);
