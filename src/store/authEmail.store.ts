import { create } from "zustand";

interface States {
  authEmail: string;
  authCode: string;
}

interface Actions {
  setAuthEmail: (email: string) => void;
  setAuthCode: (code: string) => void;
}

const useAuthEmailStore = create<States & Actions>()((set) => ({
  authEmail: "",
  authCode: "",
  setAuthEmail: (authEmail: string) => {
    set({ authEmail });
  },
  setAuthCode: (authCode: string) => {
    set({ authCode });
  },
}));

export default useAuthEmailStore;
