import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-[12px] border border-border bg-cream px-3 py-2 text-coffee shadow-sm focus:ring-2 focus:ring-matcha-strong focus:border-matcha-strong transition-all",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
