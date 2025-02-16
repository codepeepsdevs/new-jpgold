import { StaticImageData } from "next/image";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
interface NFTItem {
  id: number;
  amount: number;
  price: number;
  imageUrl: string | StaticImageData;
  verified: boolean;
}

interface CartStore {
  items: NFTItem[];
  addItem: (item: NFTItem) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
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

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price, 0);
      },

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
