import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskItem from "@/components/molecules/TaskItem";
import QuickAddTask from "@/components/molecules/QuickAddTask";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import TaskModal from "@/components/organisms/TaskModal";
import { taskService } from "@/services/api/taskService";
import { sortTasksByDueDate } from "@/utils/dateHelpers";

const TaskList = ({ listId, listName = "Tasks", className }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showCompleted, setShowCompleted] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [listId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      
      let tasksData;
      if (listId === "my-day" || !listId) {
        tasksData = await taskService.getTodayTasks();
      } else {
        tasksData = await taskService.getByListId(listId);
      }
      
      setTasks(tasksData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        listId: listId || "personal"
      });
      
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task");
      console.error("Error adding task:", err);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      const updatedTask = await taskService.update(taskId, { 
        completed: !task.completed 
      });
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ));
      
      toast.success(
        updatedTask.completed ? "Task completed! 🎉" : "Task restored"
      );
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error toggling task:", err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (taskId, updateData) => {
    try {
      const updatedTask = await taskService.update(taskId, updateData);
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ));
      
      setEditingTask(null);
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const sortTasks = (tasksToSort) => {
    const sorted = [...tasksToSort];
    
    switch (sortBy) {
      case "dueDate":
        return sortTasksByDueDate(sorted);
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case "created":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "alphabetical":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const filteredTasks = showCompleted 
    ? tasks 
    : tasks.filter(task => !task.completed);

  const sortedTasks = sortTasks(filteredTasks);
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            {listName}
          </h1>
          <p className="text-gray-600 mt-1">
            {totalCount === 0 
              ? "No tasks yet"
              : `${totalCount - completedCount} active, ${completedCount} completed`
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-auto"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="created">Sort by Created</option>
            <option value="alphabetical">Sort Alphabetically</option>
          </Select>
          
          <Button
            variant={showCompleted ? "primary" : "ghost"}
            size="sm"
            onClick={() => setShowCompleted(!showCompleted)}
            className="whitespace-nowrap"
          >
            <ApperIcon name="Eye" size={16} className="mr-2" />
            {showCompleted ? "Hide" : "Show"} Completed
          </Button>
        </div>
      </div>

      {/* Quick Add */}
      <QuickAddTask
        onAdd={handleAddTask}
        currentListId={listId || "personal"}
      />

      {/* Tasks List */}
      {sortedTasks.length === 0 ? (
        <Empty
          icon="CheckSquare"
          title={showCompleted ? "No completed tasks" : "No active tasks"}
          description={showCompleted 
            ? "Complete some tasks to see them here"
            : "Add your first task to get started with TaskFlow"
          }
          action={
            !showCompleted && (
              <Button variant="primary" onClick={() => {}}>
                <ApperIcon name="Plus" size={18} className="mr-2" />
                Add Your First Task
              </Button>
            )
          }
        />
      ) : (
        <motion.div
          layout
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.Id}
                task={task}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Task Edit Modal */}
      {editingTask && (
        <TaskModal
          task={editingTask}
          onSave={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;