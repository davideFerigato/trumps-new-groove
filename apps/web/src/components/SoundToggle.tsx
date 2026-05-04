"use client";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useSoundStore } from "@/store/useSoundStore";

export default function SoundToggle() {
  const { soundEnabled, toggleSound } = useSoundStore();
  const Icon = soundEnabled ? Volume2 : VolumeX;

  return (
    <button
      onClick={toggleSound}
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all ${
        soundEnabled ? "text-gold-400 golden-glow" : "text-aztec-red"
      }`}
      aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
    >
      <motion.div
        animate={soundEnabled ? { scale: [1, 1.15, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>
    </button>
  );
}