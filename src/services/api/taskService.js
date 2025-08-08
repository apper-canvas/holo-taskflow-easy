import taskData from "@/services/mockData/tasks.json";

let tasks = [...taskData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) throw new Error("Task not found");
    return { ...task };
  },

  async getByListId(listId) {
    await delay(250);
    return tasks.filter(t => t.listId === listId).map(t => ({ ...t }));
  },

  async getCompleted() {
    await delay(300);
    return tasks.filter(t => t.completed).map(t => ({ ...t }));
  },

  async getTodayTasks() {
    await delay(250);
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter(t => 
      t.dueDate === today || 
      (t.dueDate && new Date(t.dueDate) <= new Date() && !t.completed)
    ).map(t => ({ ...t }));
  },

  async create(taskData) {
    await delay(400);
    const newId = Math.max(...tasks.map(t => t.Id)) + 1;
    const newTask = {
      Id: newId,
      title: taskData.title,
      completed: false,
      listId: taskData.listId || "personal",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) throw new Error("Task not found");
    
    const updatedTask = { ...tasks[index], ...updateData };
    if (updateData.completed && !tasks[index].completed) {
      updatedTask.completedAt = new Date().toISOString();
    } else if (!updateData.completed && tasks[index].completed) {
      updatedTask.completedAt = null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) throw new Error("Task not found");
    
    tasks.splice(index, 1);
    return true;
  },

  async search(query) {
    await delay(200);
    const lowercaseQuery = query.toLowerCase();
    return tasks
      .filter(t => t.title.toLowerCase().includes(lowercaseQuery))
      .map(t => ({ ...t }));
  }
};