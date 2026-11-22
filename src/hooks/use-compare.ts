import { create } from "zustand";
import { Property } from "@/types";

interface CompareStore {
  items: Property[];
  addItem: (item: Property) => boolean;
  removeItem: (id: string) => void;
  clear: () => void;
  hasItem: (id: string) => boolean;
}

export const useCompare = create<CompareStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const current = get().items;
    if (current.some((p) => p.id === item.id)) {
      return false;
    }
    if (current.length >= 4) {
      alert("Bạn chỉ có thể so sánh tối đa 4 bất động sản cùng lúc.");
      return false;
    }
    set({ items: [...current, item] });
    return true;
  },
  removeItem: (id) => {
    set({ items: get().items.filter((p) => p.id !== id) });
  },
  clear: () => set({ items: [] }),
  hasItem: (id) => get().items.some((p) => p.id === id),
}));
