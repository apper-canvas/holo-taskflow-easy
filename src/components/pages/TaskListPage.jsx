import React from "react";
import { useParams } from "react-router-dom";
import TaskList from "@/components/organisms/TaskList";

const TaskListPage = () => {
  const { listId } = useParams();
  
  const getListName = (id) => {
    if (!id) return "My Day";
    
    const listNames = {
      "1": "My Day",
      "2": "Work", 
      "3": "Personal",
      "4": "Projects",
      "5": "Shopping"
    };
    
    return listNames[id] || "Tasks";
  };

  const getListKey = (id) => {
    if (!id) return "personal"; // Default for My Day
    
    const listKeys = {
      "1": "personal", // My Day shows personal tasks
      "2": "work",
      "3": "personal", 
      "4": "projects",
      "5": "shopping"
    };
    
    return listKeys[id] || "personal";
  };

  return (
    <TaskList
      listId={listId ? getListKey(listId) : undefined}
      listName={getListName(listId)}
    />
  );
};

export default TaskListPage;