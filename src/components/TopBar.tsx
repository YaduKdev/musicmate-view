import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignIOAuthButtons from "./SignIOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const TopBar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="hidden sm:flex gap-2 items-center">
        <img src="/logo.png" className="size-8" alt="Music Mate Logo" />
        Music Mate
      </div>
      <div className="flex sm:hidden gap-2 items-center">
        <img src="/logo.png" className="size-8" alt="Music Mate Logo" />
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            <span className="hidden sm:flex">Admin Dashboard</span>
          </Link>
        )}

        <SignedOut>
          <SignIOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
