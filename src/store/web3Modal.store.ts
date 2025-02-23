import { create } from "zustand";

interface States {
  connectModalOpen: boolean;
  disconnectModalOpen: boolean;
}

interface Actions {
  setConnectModalOpen: (connectModalOpen: boolean) => void;
  setDisconnectModalOpen: (disconnectModalOpen: boolean) => void;
}

const useWeb3ModalStore = create<States & Actions>()((set) => ({
  connectModalOpen: false,
  disconnectModalOpen: false,
  setConnectModalOpen: (connectModalOpen: boolean) => {
    set({ connectModalOpen });
  },
  setDisconnectModalOpen: (disconnectModalOpen: boolean) => {
    set({ disconnectModalOpen });
  },
}));

export default useWeb3ModalStore;
