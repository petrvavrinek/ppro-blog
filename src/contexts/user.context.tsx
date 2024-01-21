import { createContext } from "react";

type UserContextData = {
  user: User | null;
  setUser: (newUser: User | null) => void;
  clear: () => void;
};

export const UserContext = createContext<UserContextData>({
  setUser: () => {},
  user: null,
  clear: () => {},
});
