import { useCallback } from "react";
import { useSoundStore } from "@/store/useSoundStore";

export function useSound() {
  const soundEnabled = useSoundStore((state) => state.soundEnabled);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    const audio = new Audio("/sounds/cha-ching.mp3");
    audio.play().catch(() => {
      // browser could block autoplay, ignore
    });
  }, [soundEnabled]);

  return playSound;
}
