"use client";
import { trpc } from "@/lib/trpc/react";
import { useState } from "react";

export default function MyBetsList() {
  const { data: bets, isLoading } = trpc.bets.myBets.useQuery();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <p>Loading bets...</p>;
  if (!bets || bets.length === 0) return <p className="text-gold-600 text-center">No bets placed yet.</p>;

  // Filtra in base al testo della frase
  const filteredBets = bets.filter(bet =>
    bet.phraseText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Barra di ricerca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by prophecy text..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-2 bg-obsidian border border-gold-600 rounded-lg text-bone-white font-cinzel placeholder:text-gold-600/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Lista scommesse */}
      <div className="space-y-4">
        {filteredBets.map(bet => (
          <div
            key={bet.id}
            className="bg-surface-dark aztec-border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gold-400 italic">“{bet.phraseText}”</p>
              <p className="text-xs text-gold-600 mt-1">
                {bet.predictedOutcome ? "YES" : "NO"} • {bet.amount} TB
              </p>
            </div>
            <div className="text-right">
              <span className={`text-sm font-bold ${bet.status === "won" ? "text-jungle-green" : bet.status === "lost" ? "text-aztec-red" : "text-gold-400"}`}>
                {bet.status.toUpperCase()}
              </span>
              {bet.resolvedAt && (
                <p className="text-xs text-gold-600">{new Date(bet.resolvedAt).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}