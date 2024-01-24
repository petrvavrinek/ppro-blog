import { ApiTokenContext } from "@/contexts/api-token.context";
import { UserContext } from "@/contexts/user.context";
import { useApiSWR } from "@/hooks/use-api";
import { PropsWithChildren, useContext, useEffect, useState } from "react";

export const UserContextProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: tokenData, clear: clearToken } = useContext(ApiTokenContext);

  const fetchMe = useApiSWR<User>(tokenData?.token ? "/user/me" : null, {
    requireAuth: false,
  });

  useEffect(() => {
    fetchMe.data && setUser(fetchMe.data);
  }, [fetchMe.data]);

  useEffect(() => {});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: (newUser) => setUser(newUser),
        clear: () => {
          setUser(null);
          console.log(clearToken);
          clearToken();
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
