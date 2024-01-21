import { ApiTokenContext } from "@/contexts/api-token.context";
import { useContext } from "react";
import useSWR from "swr";

interface useApiCallOptions {
  requireAuth: boolean;
}

export const useApiCall = <TResponse>(
  path?: string | null,
  options: useApiCallOptions = { requireAuth: true }
) => {
  const tokenContext = useContext(ApiTokenContext);
  if (!tokenContext.data && options.requireAuth)
    throw new Error("Token data is undefined");

  const fetcher = (input: URL | RequestInfo, init?: RequestInit) => {
    const initData: RequestInit = {
      ...(init || {}),
      headers: {
        Authorization: `Bearer ${tokenContext.data?.token}`,
        ...(init?.headers || {}),
      },
    };

    return fetch(input, initData).then((res) => res.json());
  };
  return useSWR<TResponse>(
    path ? `${import.meta.env.VITE_API_URL}/api${path}` : null,
    fetcher
  );
};
