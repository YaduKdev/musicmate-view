import { apiCaller } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  verifyAdmin: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  verifyAdmin: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiCaller.get("/admin/verify");
      set({ isAdmin: response.data.admin });
    } catch (error: any) {
      set({ isAdmin: false, error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
