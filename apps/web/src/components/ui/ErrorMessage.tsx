import { AlertCircle } from "lucide-react";
import Button from "./Button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-start gap-3 p-4 rounded-lg border border-aztec-red/30 bg-surface-dark/50">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-aztec-red" />
        <span className="text-bone-white font-cinzel">{message}</span>
      </div>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}