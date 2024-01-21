import { FormMethod } from "react-router-dom";

export const apiCall = async <TResponse>(
  path: string,
  method: FormMethod,
  body: any
): Promise<
  | {
      ok: true;
      data: TResponse;
    }
  | { ok: false }
> => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    method,
  });

  if (result.status >= 200 && result.status < 300) {
    const data = await result.json();
    return {
      ok: true,
      data,
    };
  }

  // error
  return { ok: false };
};

type LoginResponse = {
  accessToken: string;
};

export namespace User {
  export const login = (username: string, password: string) =>
    apiCall<LoginResponse>("/auth/login", "post", { username, password });

  export const register = (username: string, password: string) =>
    apiCall("/auth/register", "post", { username, password });
}
