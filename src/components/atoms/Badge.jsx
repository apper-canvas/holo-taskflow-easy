import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  className,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    high: "bg-error/10 text-error border border-error/20",
    medium: "bg-warning/10 text-warning border border-warning/20",
    low: "bg-gray-100 text-gray-600 border border-gray-200",
    overdue: "bg-gradient-to-r from-error to-red-600 text-white shadow-sm animate-pulse-gentle",
    today: "bg-gradient-to-r from-primary to-primary-hover text-white shadow-sm",
    tomorrow: "bg-gradient-to-r from-info to-blue-600 text-white shadow-sm",
    upcoming: "bg-gray-100 text-gray-700"
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;