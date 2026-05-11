"use client";
import { useT } from "@/hooks/useTranslation";

export default function Loading() {
  const { t } = useT();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Spinning golden sun */}
      <div className="w-16 h-16 border-4 border-gold-600 border-t-transparent rounded-full animate-spin mb-6" />
      <h1 className="text-2xl font-cinzel-decorative gold-shimmer animate-pulse">
        {t("loading.title")}
      </h1>
    </div>
  );
}