import { create } from "zustand";

interface FavoritesStore {
  favoriteIds: string[];
  toggleFavorite: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
}

export const useFavorites = create<FavoritesStore>((set, get) => ({
  favoriteIds: ["bds-001", "bds-004"],
  toggleFavorite: (id) => {
    const current = get().favoriteIds;
    const exists = current.includes(id);
    if (exists) {
      set({ favoriteIds: current.filter((x) => x !== id) });
      return false;
    } else {
      set({ favoriteIds: [...current, id] });
      return true;
    }
  },
  isFavorite: (id) => get().favoriteIds.includes(id),
}));
