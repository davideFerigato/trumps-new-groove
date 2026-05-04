interface SkeletonProps {
  className?: string;
  variant?: "text" | "heading" | "avatar" | "card";
}

export default function Skeleton({ className = "", variant = "text" }: SkeletonProps) {
  const variantBaseClasses = {
    text: "h-4 w-full rounded",
    heading: "h-8 w-3/4 rounded",
    avatar: "h-12 w-12 rounded-full",
    card: "h-48 w-full rounded-lg",
  };

  return (
    <div
      className={`skeleton-shimmer ${variantBaseClasses[variant]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}