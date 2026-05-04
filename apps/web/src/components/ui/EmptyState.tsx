import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Button from "./Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <motion.div
        animate={{ y: [-8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
        className="mb-6"
      >
        <Icon className="w-16 h-16 text-gold-600" />
      </motion.div>
      <h3 className="text-xl font-cinzel-decorative text-gold-400 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gold-600 max-w-prose">{description}</p>
      )}
      {action && (
        <div className="mt-4">
          <Button variant="secondary" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}