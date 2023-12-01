import { create } from "zustand";

type Store = {
   mobileSidebar: boolean;
   setMobileSideBar: (isToggle: boolean) => void;
   depositeDialog: boolean;
   setDepositeDialog: (isToggle: boolean) => void;
};

export const useStore = create<Store>()((set) => ({
   mobileSidebar: false,
   setMobileSideBar: (mobileSidebar: boolean) => set({ mobileSidebar }),
   depositeDialog: false,
   setDepositeDialog: (depositeDialog: boolean) => set({ depositeDialog }),
}));
