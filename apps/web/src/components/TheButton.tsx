"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc/react";
import { useSound } from "@/hooks/useSound";

export default function TheButton() {
  const clickMutation = trpc.clicks.click.useMutation();
  const utils = trpc.useUtils();
  const playSound = useSound();
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    try {
      setClicked(true);
      await clickMutation.mutateAsync({ soundEnabled: true });
      playSound();
      // invalida le query per aggiornare contatore e frase
      utils.clicks.globalCount.invalidate();
      utils.phrases.random.invalidate();
    } catch (error) {
      // l'errore di rate limiting verrà gestito dal componente
      console.error(error);
    } finally {
      setTimeout(() => setClicked(false), 200);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        disabled={clickMutation.isPending}
        className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400 disabled:opacity-70"
        aria-label="Generate random Trump phrase"
      >
        <motion.span
          animate={clicked ? { y: [0, -10, 0] } : {}}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Make America Groove Again
        </motion.span>
      </motion.button>
      {clickMutation.isError && (
        <p className="text-red-500 text-sm mt-2">
          {clickMutation.error?.message || "Could not register click."}
        </p>
      )}
    </div>
  );
}
