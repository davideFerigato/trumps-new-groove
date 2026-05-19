"use client";
import { useState } from "react";
import { trpc } from "@/lib/trpc/react";
import Button from "./ui/Button";

export default function GdprRights() {
  const [showData, setShowData] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [exportedData, setExportedData] = useState<any>(null);

  const exportQuery = trpc.gdpr.exportData.useQuery(undefined, { enabled: false });
  const deleteMutation = trpc.gdpr.deleteAccount.useMutation();

  const handleExport = async () => {
    const result = await exportQuery.refetch();
    if (result.data) {
      setExportedData(result.data);
      setShowData(true);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteMutation.mutateAsync();
    // Dopo la cancellazione, reindirizza alla home o fai logout
    window.location.href = "/";
  };

  return (
    <div className="mt-12 bg-surface-dark aztec-border p-6 rounded-xl">
      <h2 className="text-2xl font-cinzel-decorative gold-shimmer mb-4">
        GDPR Rights
      </h2>
      <p className="text-gold-200 text-sm mb-6">
        You can request a copy of your data or permanently delete your account and all associated information.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="secondary" onClick={handleExport} disabled={exportQuery.isFetching}>
          {exportQuery.isFetching ? "Loading..." : "Request Data Export"}
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending
            ? "Deleting..."
            : confirmDelete
            ? "Confirm Deletion?"
            : "Delete My Account"}
        </Button>
      </div>

      {confirmDelete && (
        <p className="text-aztec-red text-sm mt-3">
          This action is irreversible. All your data will be permanently deleted. Click again to confirm.
        </p>
      )}

      {showData && exportedData && (
        <div className="mt-6">
          <h3 className="text-lg font-cinzel-decorative text-gold-400 mb-3">Exported Data</h3>
          <pre className="bg-obsidian border border-gold-600 rounded-lg p-4 text-gold-200 text-sm overflow-x-auto max-h-96">
            {JSON.stringify(exportedData, null, 2)}
          </pre>
          <button
            onClick={() => setShowData(false)}
            className="mt-3 text-gold-400 hover:underline text-sm"
          >
            Close
          </button>
        </div>
      )}

      {deleteMutation.isError && (
        <p className="text-aztec-red text-sm mt-3">
          Error: {deleteMutation.error?.message || "Failed to delete account"}
        </p>
      )}
    </div>
  );
}