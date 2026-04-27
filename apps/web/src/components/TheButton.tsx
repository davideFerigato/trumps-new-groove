"use client";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/react";
import { useSound } from "@/hooks/useSound";
import { useState } from "react";

export default function TheButton() {
  const clickMutation = trpc.clicks.click.useMutation();
  const utils = trpc.useUtils();
  const playSound = useSound();
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    setClicked(true);
    await clickMutation.mutateAsync({ soundEnabled: true });
    playSound();
    utils.clicks.globalCount.invalidate();
    utils.phrases.random.invalidate();
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400"
      aria-label="Generate random Trump phrase"
    >
      <motion.span
        animate={clicked ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 0.2 }}
      >
        Make America Groove Again
      </motion.span>
    </motion.button>
  );
}