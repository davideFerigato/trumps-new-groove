import { create } from "zustand";

interface SoundState {
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useSoundStore = create<SoundState>((set) => ({
  soundEnabled: true, // abilitato di default
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));
