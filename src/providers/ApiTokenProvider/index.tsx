import { ApiTokenContext } from "@/contexts/api-token.context";
import { PropsWithChildren, useEffect, useState } from "react";

const SaveKey = "api.accessToken" as const;

export const ApiTokenProvider = (
  props: PropsWithChildren<{ save?: boolean }>
) => {
  const [token, setToken] = useState<
    { token: string; expiresAt: Date } | undefined
  >();

  useEffect(() => {
    if (!props.save) return;

    const token = localStorage.getItem(SaveKey);
    if (!token) return;

    setToken({ token, expiresAt: new Date() });
  }, []);

  useEffect(() => {
    if (!token?.token || !props.save) return;

    localStorage.setItem(SaveKey, token.token);
  }, [token]);

  const clearToken = () => {
    localStorage.removeItem(SaveKey);
    setToken(undefined);
  };

  return (
    <ApiTokenContext.Provider
      value={{
        data: token,
        setToken: (newToken, newExpiresAt) =>
          setToken({ token: newToken, expiresAt: newExpiresAt }),
        clear: clearToken,
      }}
    >
      {props.children}
    </ApiTokenContext.Provider>
  );
};
