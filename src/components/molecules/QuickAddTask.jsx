import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const QuickAddTask = ({ onAdd, currentListId = "personal", className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      await onAdd({
        title: title.trim(),
        listId: currentListId,
        priority: "medium"
      });
      
      setTitle("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        className={`w-full justify-start text-gray-500 hover:text-primary border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 py-4 ${className}`}
      >
        <ApperIcon name="Plus" size={20} className="mr-2" />
        Add a task
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-white rounded-xl border-2 border-primary shadow-lg p-4 ${className}`}
    >
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="mb-3"
          autoFocus
        />
        
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Add Task
              </>
            )}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default QuickAddTask;