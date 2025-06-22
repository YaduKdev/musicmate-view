import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useRef } from "react";
import Featured from "./components/Featured";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sections from "./components/Sections";
import { usePlayerStore } from "@/stores/usePlayerStore";

const Home = () => {
  const {
    suggestedSongs,
    trendingSongs,
    featuredSongs,
    fetchFeaturedSongs,
    fetchSuggestedSongs,
    fetchTrendingSongs,
    isLoading,
  } = useMusicStore();
  const { initializeQueue, currentSong } = usePlayerStore();
  const prevCurrentSong = useRef(currentSong);

  useEffect(() => {
    fetchFeaturedSongs();
    fetchSuggestedSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchSuggestedSongs, fetchTrendingSongs]);

  useEffect(() => {
    let isFirstTimeCurrentSongSet =
      !prevCurrentSong.current && currentSong ? true : false;

    if (
      suggestedSongs.length > 0 &&
      trendingSongs.length > 0 &&
      featuredSongs.length > 0 &&
      currentSong &&
      isFirstTimeCurrentSongSet
    ) {
      const allSongs = [...featuredSongs, ...suggestedSongs, ...trendingSongs];

      const startIndex = allSongs.indexOf(currentSong);

      initializeQueue(allSongs, startIndex);
    }

    prevCurrentSong.current = currentSong;
  }, [
    initializeQueue,
    suggestedSongs,
    trendingSongs,
    featuredSongs,
    currentSong,
  ]);

  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
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
