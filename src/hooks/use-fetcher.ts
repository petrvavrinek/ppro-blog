export const useFetcher = (token?: string) => {
  const fetcher = (input: URL | RequestInfo, init?: RequestInit) => {
    const initData: RequestInit = {
      ...(init || {}),
      headers: {
        Authorization: `Bearer ${token}`,
        ...(init?.headers || {}),
      },
    };

    return fetch(input, initData).then((res) => res.json().catch(() => null));
  };

  return fetcher;
};
