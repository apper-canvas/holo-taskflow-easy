import listData from "@/services/mockData/lists.json";

let lists = [...listData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const listService = {
  async getAll() {
    await delay(250);
    return [...lists].sort((a, b) => a.position - b.position);
  },

  async getById(id) {
    await delay(200);
    const list = lists.find(l => l.Id === parseInt(id));
    if (!list) throw new Error("List not found");
    return { ...list };
  },

  async create(listData) {
    await delay(300);
    const newId = Math.max(...lists.map(l => l.Id)) + 1;
    const maxPosition = Math.max(...lists.map(l => l.position));
    
    const newList = {
      Id: newId,
      name: listData.name,
      color: listData.color || "#5B4FE5",
      icon: listData.icon || "List",
      position: maxPosition + 1
    };
    
    lists.push(newList);
    return { ...newList };
  },

  async update(id, updateData) {
    await delay(250);
    const index = lists.findIndex(l => l.Id === parseInt(id));
    if (index === -1) throw new Error("List not found");
    
    lists[index] = { ...lists[index], ...updateData };
    return { ...lists[index] };
  },

  async delete(id) {
    await delay(200);
    const index = lists.findIndex(l => l.Id === parseInt(id));
    if (index === -1) throw new Error("List not found");
    
    lists.splice(index, 1);
    return true;
  }
};