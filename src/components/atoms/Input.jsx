import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text", 
  className,
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";
  
  const errorStyles = error ? "border-error focus:border-error focus:ring-error/10" : "";
  
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;