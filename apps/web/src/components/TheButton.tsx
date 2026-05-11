"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/react";
import { useSoundStore } from "@/store/useSoundStore";
import { useT } from "@/hooks/useTranslation";

export default function TheButton() {
  const { t } = useT();
  const clickMutation = trpc.clicks.click.useMutation();
  const utils = trpc.useUtils();
  const soundEnabled = useSoundStore((s) => s.soundEnabled);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Lazy load audio when sound is enabled
  useEffect(() => {
    if (soundEnabled && !audioRef.current) {
      audioRef.current = new Audio("/sounds/cha-ching.mp3");
      audioRef.current.volume = 0.4;
    }
  }, [soundEnabled]);

  const handleClick = async () => {
    try {
      await clickMutation.mutateAsync({ soundEnabled });
      if (soundEnabled && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      // Burst particles
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 120,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 800);

      utils.clicks.globalCount.invalidate();
      utils.phrases.random.invalidate();
    } catch (error) {
      console.error("Click failed:", error);
    }
  };

  return (
    <div className="relative flex justify-center my-12">
      {/* Particle burst */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-gold-400 rounded-full pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      <motion.button
        onClick={handleClick}
        disabled={clickMutation.isPending}
        whileTap={{ scale: 0.9 }}
        className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-radial from-gold-600 to-gold-900 border-4 border-gold-400 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transition-shadow focus:outline-none focus:ring-4 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={t("home.invokeAria")}
      >
        <span className="block text-center">
          <span className="font-cinzel-decorative text-white text-xl leading-tight">
            {t("home.invokeLine1")}
            <br />
            {t("home.invokeLine2")}
          </span>
        </span>
      </motion.button>
    </div>
  );
}