import { Route, Routes } from "react-router-dom";

import AppNavbar from "./components/Navbar";
import "./globals.css";
import Providers from "./providers";

import FeedPage from "./pages/Feed";
import UserProfilePage from "./pages/UserProfile";

function App() {
  return (
    <Providers>
      <AppNavbar />
      <Routes>
        <Route path="/" Component={FeedPage} />
        <Route path="/user/:id" Component={UserProfilePage} />
      </Routes>
    </Providers>
  );
}

export default App;
