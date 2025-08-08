import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import { taskService } from "@/services/api/taskService";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return [];
    
    try {
      const results = await taskService.search(query);
      return results;
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  };

  const handleQuickAdd = () => {
    // This would open a quick add modal in a real app
    console.log("Quick add task");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onSearch={handleSearch}
          onQuickAdd={handleQuickAdd}
          onToggleMobileMenu={toggleMobileMenu}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;