"use client";
import { AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ErrorPage({ error: _error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="w-24 h-24 text-aztec-red mb-6" />
      <h1 className="text-4xl font-cinzel-decorative gold-shimmer mb-4">
        The Oracle Has Spoken an Error
      </h1>
      <p className="text-gold-600 mb-8 max-w-md">
        Something went wrong in the imperial machinery.
      </p>
      <Button variant="secondary" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}