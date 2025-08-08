import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-hover text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus:ring-primary/50",
    secondary: "bg-white border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary hover:scale-[1.02] focus:ring-primary/50",
    accent: "bg-gradient-to-r from-accent to-orange-400 text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus:ring-accent/50",
    ghost: "text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-[1.02] focus:ring-primary/50",
    danger: "bg-gradient-to-r from-error to-red-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus:ring-error/50"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;