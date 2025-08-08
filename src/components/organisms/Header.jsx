import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onSearch, onQuickAdd, onToggleMobileMenu, showSearch = true }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  const handleSearch = async (query) => {
    if (onSearch) {
      const results = await onSearch(query);
      setSearchResults(results || []);
      setShowSearchOverlay(query.length > 0);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2"
            >
              <ApperIcon name="Menu" size={20} />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={20} className="text-white" />
              </div>
<h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
TaskFlow 2
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-2xl mx-8">
            {showSearch && (
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search all tasks..."
                className="flex-1"
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="accent"
              size="md"
              onClick={onQuickAdd}
              className="hidden sm:flex"
            >
              <ApperIcon name="Plus" size={18} className="mr-2" />
              Add Task
            </Button>
            
            <Button
              variant="accent"
              size="sm"
              onClick={onQuickAdd}
              className="sm:hidden p-3"
            >
              <ApperIcon name="Plus" size={18} />
            </Button>
          </div>
        </div>
      </header>

      {/* Search Results Overlay */}
      {showSearchOverlay && searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-6 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto mt-2"
        >
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              Search Results ({searchResults.length})
            </h3>
            <div className="space-y-2">
              {searchResults.map((task) => (
                <div key={task.Id} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: task.listColor || "#5B4FE5" }}
                    />
                    <span className="flex-1 text-gray-900">{task.title}</span>
                    {task.dueDate && (
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;