import { ApiTokenContext } from "@/contexts/api-token.context";
import { PropsWithChildren, useEffect, useState } from "react";

const SaveKey = "api.accessToken" as const;

export const ApiTokenProvider = (
  props: PropsWithChildren<{ save?: boolean }>
) => {
  const [token, setToken] = useState<
    { token: string; expiresAt: Date } | undefined
  >();
  const [renderReady, setRenderReady] = useState(false);

  useEffect(() => {
    if (!props.save) return;

    const token = localStorage.getItem(SaveKey);
    if (!token) return setRenderReady(true);

    setToken({ token, expiresAt: new Date() });
    setRenderReady(true);
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
      {renderReady && props.children}
    </ApiTokenContext.Provider>
  );
};
