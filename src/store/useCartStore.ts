import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { NFTAsset } from "@/constants/types";

interface CartStore {
  items: NFTAsset[];
  addItem: (item: NFTAsset) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        toast.success("Item added to cart");
        set((state) => {
          // Check if item already exists
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) return state;
          return { items: [...state.items, item] };
        });
      },

      removeItem: (itemId) => {
        toast.success("Item removed from cart");
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        const state = get();
        return state.items.length;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
