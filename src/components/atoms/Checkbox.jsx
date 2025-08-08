import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  checked = false, 
  onChange,
  className,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onChange && onChange(!checked)}
      className={cn(
        "w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
        checked 
          ? "bg-gradient-to-br from-success to-green-600 border-success text-white shadow-md animate-bounce-subtle" 
          : "border-gray-300 hover:border-primary",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={14} 
          className="text-white"
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;