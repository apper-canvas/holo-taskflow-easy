import React, { useState, useEffect } from "react";
import { format, parseISO, isToday, isYesterday, isThisWeek } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";
import { toast } from "react-toastify";

const ArchivePage = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  const loadCompletedTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const tasks = await taskService.getCompleted();
      setCompletedTasks(tasks);
    } catch (err) {
      setError("Failed to load completed tasks");
      console.error("Error loading completed tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreTask = async (taskId) => {
    try {
      await taskService.update(taskId, { completed: false });
      setCompletedTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task restored successfully!");
    } catch (err) {
      toast.error("Failed to restore task");
      console.error("Error restoring task:", err);
    }
  };

  const groupTasksByDate = (tasks) => {
    const groups = {};
    
    tasks.forEach(task => {
      if (!task.completedAt) return;
      
      const completedDate = parseISO(task.completedAt);
      let groupKey;
      
      if (isToday(completedDate)) {
        groupKey = "Today";
      } else if (isYesterday(completedDate)) {
        groupKey = "Yesterday";
      } else if (isThisWeek(completedDate)) {
        groupKey = format(completedDate, "EEEE");
      } else {
        groupKey = format(completedDate, "MMMM d, yyyy");
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(task);
    });
    
    // Sort groups by date (most recent first)
    const sortedGroups = Object.entries(groups).sort(([, a], [, b]) => {
      const dateA = parseISO(a[0]?.completedAt);
      const dateB = parseISO(b[0]?.completedAt);
      return dateB - dateA;
    });
    
    return sortedGroups;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCompletedTasks} />;

  if (completedTasks.length === 0) {
    return (
      <Empty
        icon="Archive"
        title="No completed tasks yet"
        description="Complete some tasks and they'll appear here for you to review and restore if needed."
      />
    );
  }

  const groupedTasks = groupTasksByDate(completedTasks);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Archive
          </h1>
          <p className="text-gray-600 mt-1">
            {completedTasks.length} completed task{completedTasks.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
            <ApperIcon name="Archive" size={20} className="text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {groupedTasks.map(([dateGroup, tasks]) => (
            <motion.div
              key={dateGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-display font-semibold text-gray-700 border-b border-gray-200 pb-2">
                {dateGroup}
              </h3>
              
              <div className="space-y-3">
                {tasks.map(task => (
                  <motion.div
                    key={task.Id}
                    layout
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-br from-success to-green-600 rounded border-2 border-success flex items-center justify-center">
                        <ApperIcon name="Check" size={14} className="text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <span className="text-gray-700 line-through">
                          {task.title}
                        </span>
                        {task.completedAt && (
                          <p className="text-sm text-gray-500 mt-1">
                            Completed {format(parseISO(task.completedAt), "h:mm a")}
                          </p>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRestoreTask(task.Id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                        Restore
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArchivePage;