import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className }) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
    setIsExpanded(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <ApperIcon 
            name="Search" 
            size={18} 
            className="text-gray-400"
          />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => !query && setIsExpanded(false)}
          className={cn(
            "pl-11 pr-10 transition-all duration-300",
            isExpanded && "shadow-lg border-primary ring-4 ring-primary/10"
          )}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;