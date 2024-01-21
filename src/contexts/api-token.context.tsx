import { createContext } from "react";

type ApiTokenContextData = {
  data?: {
    token: string;
    expiresAt: Date;
  };
  setToken: (newToken: string, newExpiresAt: Date) => void;
  clear: () => void;
};

export const ApiTokenContext = createContext<ApiTokenContextData>({
  data: undefined,
  setToken: () => {},
  clear: () => {},
});
