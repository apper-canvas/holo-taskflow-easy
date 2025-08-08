import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import ListItem from "@/components/molecules/ListItem";
import ApperIcon from "@/components/ApperIcon";
import { listService } from "@/services/api/listService";
import { taskService } from "@/services/api/taskService";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose, className }) => {
  const [lists, setLists] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [listsData, tasksData] = await Promise.all([
        listService.getAll(),
        taskService.getAll()
      ]);
      
      setLists(listsData);
      
      // Calculate task counts
      const counts = {};
      listsData.forEach(list => {
        if (list.name === "My Day") {
          counts[list.Id] = tasksData.filter(task => 
            !task.completed && (
              task.dueDate === new Date().toISOString().split("T")[0] ||
              (task.dueDate && new Date(task.dueDate) <= new Date())
            )
          ).length;
        } else {
          counts[list.Id] = tasksData.filter(task => 
            task.listId === list.name.toLowerCase() && !task.completed
          ).length;
        }
      });
      
      setTaskCounts(counts);
    } catch (error) {
      console.error("Failed to load sidebar data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Progress Ring */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center">
              <ApperIcon name="Target" size={24} className="text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
              <ApperIcon name="Check" size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold text-gray-900">Today's Progress</h3>
            <p className="text-sm text-gray-500">Keep up the great work!</p>
          </div>
        </div>
      </div>

      {/* Navigation Lists */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            lists.map((list) => (
              <ListItem
                key={list.Id}
                list={list}
                taskCount={taskCounts[list.Id] || 0}
                className="w-full"
              />
            ))
          )}
        </div>
      </nav>

      {/* Archive Link */}
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/archive"
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] w-full",
              isActive 
                ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )
          }
        >
          <ApperIcon name="Archive" size={18} />
          <span className="font-medium">Archive</span>
        </NavLink>
      </div>
    </div>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className={cn("hidden lg:block w-80 bg-white border-r border-gray-200", className)}>
      {sidebarContent}
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-display font-semibold text-gray-900">TaskFlow</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
            {sidebarContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;