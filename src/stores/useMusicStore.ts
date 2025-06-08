import { apiCaller } from "@/lib/axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  suggestedSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchSuggestedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  suggestedSongs: [],
  trendingSongs: [],
  featuredSongs: [],

  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await apiCaller.get("/albums");
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await apiCaller.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSuggestedSongs: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await apiCaller.get("/songs/suggested");
      set({ suggestedSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await apiCaller.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await apiCaller.get("/songs/featured");
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
