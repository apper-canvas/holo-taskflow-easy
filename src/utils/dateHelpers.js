import { format, isToday, isTomorrow, isPast, isThisWeek, parseISO } from "date-fns";

export const formatDueDate = (dateString) => {
  if (!dateString) return null;
  
  const date = parseISO(dateString);
  
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isPast(date)) return `Overdue • ${format(date, "MMM d")}`;
  if (isThisWeek(date)) return format(date, "EEEE");
  
  return format(date, "MMM d");
};

export const getDueDateStatus = (dateString) => {
  if (!dateString) return "none";
  
  const date = parseISO(dateString);
  
  if (isPast(date) && !isToday(date)) return "overdue";
  if (isToday(date)) return "today";
  if (isTomorrow(date)) return "tomorrow";
  
  return "upcoming";
};

export const sortTasksByDueDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
};