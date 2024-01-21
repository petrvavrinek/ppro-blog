import { Route, Routes } from "react-router-dom";

import AppNavbar from "./components/Navbar";
import "./globals.css";
import Providers from "./providers";

import FeedPage from "./pages/Feed";
import PostDetailPage from "./pages/PostDetail";
import UserProfilePage from "./pages/UserProfile";

function App() {
  return (
    <Providers>
      <AppNavbar />

      <div className="container mx-auto max-w-screen-md w-full">
        <Routes>
          <Route path="/" Component={FeedPage} />
          <Route path="/user/:id" Component={UserProfilePage} />
          <Route path="/post/:id" Component={PostDetailPage} />
        </Routes>
      </div>
    </Providers>
  );
}

export default App;
