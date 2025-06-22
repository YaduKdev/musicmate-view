import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignIOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-9 sm:h-11 flex justify-center items-center"
    >
      <img src="/google.png" alt="Google Logo" className="size-4 sm:size-5" />
      <span className="hidden sm:flex">Continue With Google</span>
      <span className="sm:hidden">Sign In</span>
    </Button>
  );
};

export default SignIOAuthButtons;
