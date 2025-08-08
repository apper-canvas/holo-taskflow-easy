import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const TaskModal = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [listId, setListId] = useState(task?.listId || "personal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      await onSave(task.Id, {
        title: title.trim(),
        priority,
        dueDate: dueDate || null,
        listId
      });
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const lists = [
    { id: "personal", name: "Personal" },
    { id: "work", name: "Work" },
    { id: "projects", name: "Projects" },
    { id: "shopping", name: "Shopping" }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-gray-900">
              Edit Task
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="p-2"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                List
              </label>
              <Select
                value={listId}
                onChange={(e) => setListId(e.target.value)}
              >
                {lists.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={!title.trim() || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Save" size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;