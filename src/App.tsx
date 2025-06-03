import { Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/home/Home";
import AuthCallback from "./pages/authCallback/AuthCallback";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallback />} />
      </Routes>
    </>
  );
}

export default App;
