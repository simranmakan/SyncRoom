import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
}

const buttonVariants = {
  default: `
    bg-primary text-primary-foreground 
    hover:bg-primary/90 transition-colors duration-300
  `,

  outline: `
    border border-border text-foreground 
    bg-background hover:bg-muted hover:text-foreground 
    transition-colors duration-300
  `,

  gradient: `
    bg-[var(--gradient-primary)] text-white 
    hover:opacity-90 transition-opacity duration-300
  `,
};

const buttonSizes = {
  sm: "px-3 py-1 text-sm rounded-md",
  md: "px-4 py-2 text-base rounded-lg",
  lg: "px-6 py-3 text-lg rounded-lg",
  xl: "px-8 py-4 text-xl rounded-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants[variant], buttonSizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

