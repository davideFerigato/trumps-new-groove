import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  pending?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", pending = false, className = "", children, disabled, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center font-cinzel-decorative tracking-wider uppercase transition-all duration-180 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian hover:from-gold-700 hover:to-gold-500 hover:golden-glow active:scale-95",
      secondary:
        "bg-transparent border-2 border-gold-500 text-gold-400 hover:bg-gold-500/10 active:scale-95",
      ghost:
        "bg-transparent text-gold-400 hover:underline",
      danger:
        "bg-aztec-red text-bone-white hover:brightness-110 active:scale-95",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || pending}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;