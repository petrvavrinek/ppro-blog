export const useFetcher = (token?: string) => {
  const fetcher = (input: URL | RequestInfo, init?: RequestInit) => {
    const initData: RequestInit = {
      ...(init || {}),
      headers: init?.headers || {},
    };

    if (token) {
      (initData.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    return fetch(input, initData).then((res) => res.json().catch(() => null));
  };

  return fetcher;
};
