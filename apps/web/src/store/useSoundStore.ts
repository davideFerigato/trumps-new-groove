import { create } from "zustand";

interface SoundState {
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useSoundStore = create<SoundState>((set) => ({
  soundEnabled: false, // OFF by default
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));