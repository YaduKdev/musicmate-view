import { Route, Routes } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

// Pages and Layouts
import Home from "./pages/home/Home";
import AuthCallback from "./pages/authCallback/AuthCallback";
import MainLayout from "./layout/MainLayout";
import Chat from "./pages/chat/Chat";
import Albums from "./pages/albums/Albums";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/albums/:id" element={<Albums />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
