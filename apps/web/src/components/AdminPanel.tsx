"use client";
import { trpc } from "@/lib/trpc/react";
import GlobalClickCounter from "@/components/GlobalClickCounter";
import { Coins, Users, ScrollText, TrendingUp } from "lucide-react";
import { useT } from "@/hooks/useTranslation";

export default function AdminPanel() {
  const { t } = useT();
  const utils = trpc.useUtils();
  const { data: activeBets, isLoading: betsLoading } = trpc.bets.activeBets.useQuery();
  const resolveBet = trpc.bets.resolveBet.useMutation({
    onSuccess: () => utils.bets.activeBets.invalidate(),
  });

  const { data: stats, isLoading: statsLoading } = trpc.admin.stats.useQuery();

  if (betsLoading || statsLoading) return <p>{t("common.loading")}</p>;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-cinzel-decorative gold-shimmer mb-6">
        {t("admin.title")}
      </h1>

      {/* Contatore globale */}
      <div className="mb-8 p-4 bg-surface-dark aztec-border rounded-xl">
        <GlobalClickCounter />
      </div>

      {/* Dashboard Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-dark aztec-border p-4 rounded-xl flex items-center gap-3">
          <Users className="w-8 h-8 text-gold-400" />
          <div>
            <p className="text-xs text-gold-600 font-uncial uppercase">{t("admin.totalUsers")}</p>
            <p className="text-2xl font-cinzel-decorative gold-shimmer">{stats?.totalUsers ?? 0}</p>
          </div>
        </div>

        <div className="bg-surface-dark aztec-border p-4 rounded-xl flex items-center gap-3">
          <ScrollText className="w-8 h-8 text-gold-400" />
          <div>
            <p className="text-xs text-gold-600 font-uncial uppercase">{t("admin.totalBets")}</p>
            <p className="text-2xl font-cinzel-decorative gold-shimmer">{stats?.totalBets ?? 0}</p>
          </div>
        </div>

        <div className="bg-surface-dark aztec-border p-4 rounded-xl flex items-center gap-3">
          <Coins className="w-8 h-8 text-gold-400" />
          <div>
            <p className="text-xs text-gold-600 font-uncial uppercase">{t("admin.volumeWagered")}</p>
            <p className="text-2xl font-cinzel-decorative gold-shimmer">{stats?.totalVolume ?? 0} TB</p>
          </div>
        </div>

        <div className="bg-surface-dark aztec-border p-4 rounded-xl flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-gold-400" />
          <div>
            <p className="text-xs text-gold-600 font-uncial uppercase">{t("admin.subscribers")}</p>
            <p className="text-2xl font-cinzel-decorative gold-shimmer">{stats?.totalSubscribers ?? 0}</p>
          </div>
        </div>
      </div>

      {/* Tabella scommesse attive */}
      <div className="bg-surface-dark aztec-border p-4 rounded-xl">
        <h2 className="text-xl font-cinzel-decorative gold-shimmer mb-4">{t("admin.activeBets")}</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gold-600">
              <th className="p-2">{t("admin.prophecy")}</th>
              <th className="p-2">{t("admin.user")}</th>
              <th className="p-2">{t("admin.amount")}</th>
              <th className="p-2">{t("admin.prediction")}</th>
              <th className="p-2">{t("admin.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {activeBets?.map((bet) => (
              <tr key={bet.id} className="border-b border-gold-600/20">
                <td className="p-2 text-sm">{bet.prophecyPhrase.text}</td>
                <td className="p-2 text-sm">{bet.userId.slice(0, 8)}...</td>
                <td className="p-2">{bet.amount} TB</td>
                <td className="p-2">{bet.predictedOutcome ? "YES" : "NO"}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => resolveBet.mutate({ betId: bet.id, outcome: true })}
                    className="px-3 py-1 bg-jungle-green text-bone-white rounded text-sm"
                  >
                    {t("admin.markTrue")}
                  </button>
                  <button
                    onClick={() => resolveBet.mutate({ betId: bet.id, outcome: false })}
                    className="px-3 py-1 bg-aztec-red text-bone-white rounded text-sm"
                  >
                    {t("admin.markFalse")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}