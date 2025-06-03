import { Card, CardContent } from "@/components/ui/card";
import { apiCaller } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempt = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempt.current) return;

      try {
        syncAttempt.current = true;

        await apiCaller.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in auth callback api call", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 animate-spin text-blue-500" />
          <h3 className="text-zinc-400 text-xl font-bold">Logging In</h3>
          <p className="text-zinc-400 text-sm">Please Wait...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;
