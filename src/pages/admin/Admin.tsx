import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import Stats from "./components/Stats";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const Admin = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { fetchAllSongs, fetchStats, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAllSongs();
    fetchStats();
    fetchAlbums();
  }, [fetchAlbums, fetchStats, fetchAllSongs]);

  if (!isAdmin && !isLoading) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500 text-3xl p-4">Unauthorized Access!</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8"
    >
      <Header />
      <Stats />
      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
