import { ApiTokenContext } from "@/contexts/api-token.context";
import { useContext } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { useFetcher } from "./use-fetcher";

interface useApiCallOptions {
  requireAuth: boolean;
  swr?: SWRConfiguration;
}

export const useApiSWR = <TResponse>(
  path?: string | null,
  options: useApiCallOptions = { requireAuth: true }
) => {
  const tokenContext = useContext(ApiTokenContext);
  if (!tokenContext.data && options.requireAuth)
    throw new Error("Token data is undefined");

  const fetcher = useFetcher(tokenContext.data?.token);
  return useSWR<TResponse>(
    path ? `${import.meta.env.VITE_API_URL}/api${path}` : null,
    fetcher,
    options.swr
  );
};

type RequestInitModified = Omit<RequestInit, "body"> & { body: any };

export const useApiFetch = () => {
  const tokenContext = useContext(ApiTokenContext);
  const fetcher = useFetcher(tokenContext.data?.token);
  return <T>(path: string, init?: RequestInitModified) => {
    if (!tokenContext.data) throw new Error("Token data is undefined");

    const newInit: RequestInit = init ?? {};

    if ("body" in newInit) newInit.body = JSON.stringify(newInit.body);

    if (!newInit.headers) newInit.headers = {};
    newInit.headers = {
      ...newInit.headers,
      "Content-Type": "application/json",
    };

    return fetcher(
      `${import.meta.env.VITE_API_URL}/api${path}`,
      newInit
    ) as Promise<T>;
  };
};
