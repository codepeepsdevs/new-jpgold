import { Chain } from "@/constants/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface States {
  chain: Chain;
  connectModalOpen: boolean;
  disconnectModalOpen: boolean;
}

interface Actions {
  setChain: (chain: Chain) => void;
  setConnectModalOpen: (connectModalOpen: boolean) => void;
  setDisconnectModalOpen: (disconnectModalOpen: boolean) => void;
}

const useWeb3ModalStore = create<States & Actions>()(
  persist(
    (set) => ({
      connectModalOpen: false,
      disconnectModalOpen: false,
      chain: {} as Chain,
      setChain: (chain: Chain) => set({ chain }),
      setConnectModalOpen: (connectModalOpen: boolean) =>
        set({ connectModalOpen }),
      setDisconnectModalOpen: (disconnectModalOpen: boolean) =>
        set({ disconnectModalOpen }),
    }),
    {
      name: "web3-storage", // name of the item in localStorage
      partialize: (state) => ({ chain: state.chain }), // only persist the chain
    }
  )
);

export default useWeb3ModalStore;
