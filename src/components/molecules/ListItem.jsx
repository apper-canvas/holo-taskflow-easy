import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ListItem = ({ list, taskCount = 0, className }) => {
  const getListPath = (list) => {
    if (list.name === "My Day") return "/";
    return `/list/${list.Id}`;
  };

  return (
    <NavLink
      to={getListPath(list)}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group hover:scale-[1.02]",
          isActive 
            ? "bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg" 
            : "text-gray-700 hover:bg-primary/5 hover:text-primary",
          className
        )
      }
    >
      {({ isActive }) => (
        <>
          <div 
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: list.color }}
          />
          
          <ApperIcon
            name={list.icon}
            size={18}
            className={cn(
              "flex-shrink-0 transition-all duration-200",
              isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
            )}
          />
          
          <span className="flex-1 font-medium truncate">
            {list.name}
          </span>
          
          {taskCount > 0 && (
            <span 
              className={cn(
                "text-xs px-2 py-1 rounded-full font-medium transition-all duration-200",
                isActive 
                  ? "bg-white/20 text-white" 
                  : "bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary"
              )}
            >
              {taskCount}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

export default ListItem;