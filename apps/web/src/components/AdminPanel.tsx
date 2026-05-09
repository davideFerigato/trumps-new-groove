"use client";
import { trpc } from "@/lib/trpc/react";

export default function AdminPanel() {
  const utils = trpc.useUtils();
  const { data: activeBets, isLoading } = trpc.bets.activeBets.useQuery();
  const resolveBet = trpc.bets.resolveBet.useMutation({
    onSuccess: () => utils.bets.activeBets.invalidate(),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-cinzel-decorative gold-shimmer mb-6">Imperial Command Center</h1>
      <div className="bg-surface-dark aztec-border p-4 rounded-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gold-600">
              <th className="p-2">Prophecy</th>
              <th className="p-2">User</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Prediction</th>
              <th className="p-2">Actions</th>
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
                    Mark TRUE
                  </button>
                  <button
                    onClick={() => resolveBet.mutate({ betId: bet.id, outcome: false })}
                    className="px-3 py-1 bg-aztec-red text-bone-white rounded text-sm"
                  >
                    Mark FALSE
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