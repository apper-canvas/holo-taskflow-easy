import React, { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import { cn } from "@/utils/cn";
import { formatDueDate, getDueDateStatus } from "@/utils/dateHelpers";

const TaskItem = forwardRef(({ task, onToggle, onEdit, onDelete, className }, ref) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleToggleComplete = async () => {
    if (task.completed) {
      // Unchecking - immediate action
      onToggle(task.Id);
    } else {
      // Checking - show animation first
      setIsCompleting(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      onToggle(task.Id);
    }
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);
  const formattedDate = formatDueDate(task.dueDate);

  const getPriorityDot = (priority) => {
    const colors = {
      high: "bg-gradient-to-r from-error to-red-600",
      medium: "bg-gradient-to-r from-warning to-yellow-500",
      low: "bg-gradient-to-r from-gray-400 to-gray-500"
    };
    
    return (
      <div 
        className={cn(
          "w-2 h-2 rounded-full flex-shrink-0",
          colors[priority] || colors.medium,
          dueDateStatus === "overdue" && "animate-pulse-gentle"
        )}
      />
    );
  };

  if (isCompleting) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "bg-white rounded-xl p-4 border-2 border-success shadow-lg",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <Checkbox checked={true} />
          <div className="flex-1">
            <span className="text-gray-900 font-medium line-through">
              {task.title}
            </span>
          </div>
          <div className="flex items-center text-success">
            <ApperIcon name="Check" size={20} />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-200 group",
        task.completed && "opacity-60",
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
        />
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {getPriorityDot(task.priority)}
        </div>

        <div className="flex-1 min-w-0">
          <span 
            className={cn(
              "text-gray-900 font-medium transition-all duration-200",
              task.completed && "line-through text-gray-500"
            )}
          >
            {task.title}
          </span>
          
          {formattedDate && (
            <div className="mt-1">
              <Badge variant={dueDateStatus} className="text-xs">
                {formattedDate}
              </Badge>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showActions && !task.completed && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-1"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="p-2 h-8 w-8"
              >
                <ApperIcon name="Edit2" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                className="p-2 h-8 w-8 text-error hover:text-error hover:bg-error/5"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;