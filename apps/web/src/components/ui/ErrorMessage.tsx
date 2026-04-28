import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
      <AlertTriangle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}
