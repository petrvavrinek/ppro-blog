import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ApiTokenProvider } from "./providers/ApiTokenProvider";
import { UserContextProvider } from "./providers/UserProvider";

const Providers = (props: React.PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <ApiTokenProvider save={true}>
        <UserContextProvider>{props.children}</UserContextProvider>
      </ApiTokenProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </NextUIProvider>
  );
};
export default Providers;
