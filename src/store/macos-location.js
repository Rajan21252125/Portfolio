import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Default empty location
const DEFAULT_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: []
};

const useLocationStore = create(immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location) => set((state) => {
        state.activeLocation = location || DEFAULT_LOCATION;
    }),
    resetActiveLocation: () => set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
    })
})));

export default useLocationStore;
