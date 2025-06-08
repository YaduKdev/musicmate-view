import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import Featured from "./components/Featured";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sections from "./components/Sections";

const Home = () => {
  const {
    suggestedSongs,
    trendingSongs,
    fetchFeaturedSongs,
    fetchSuggestedSongs,
    fetchTrendingSongs,
    isLoading,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchSuggestedSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchSuggestedSongs, fetchTrendingSongs]);

  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>
          <Featured />
          <div className="space-y-8">
            <Sections
              title="Suggested For You"
              songs={suggestedSongs}
              isLoading={isLoading}
            />
            <Sections
              title="Trending Now"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Home;
