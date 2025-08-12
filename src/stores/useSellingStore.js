import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useSellingStore = create((set, get) => ({
  items: [],
  archivedItems: [],
  editingItem: null,

  loadItems: () => {
    const savedItems = localStorage.getItem('sellingItems');
    const savedArchived = localStorage.getItem('archivedItems');
    
    if (savedItems) {
      set({ items: JSON.parse(savedItems) });
    }
    if (savedArchived) {
      set({ archivedItems: JSON.parse(savedArchived) });
    }
    
    get().checkAndArchiveItems();
  },

  saveItems: () => {
    const { items, archivedItems } = get();
    localStorage.setItem('sellingItems', JSON.stringify(items));
    localStorage.setItem('archivedItems', JSON.stringify(archivedItems));
  },

  addItem: (itemData, userName) => {
    const newItem = {
      id: uuidv4(),
      ...itemData,
      createdBy: userName,
      dateCreated: new Date().toISOString(),
      status: 'pending'
    };

    set((state) => ({
      items: [...state.items, newItem]
    }));

    get().saveItems();
  },

  updateItem: (id, updates) => {
    set((state) => ({
      items: state.items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));

    get().saveItems();
  },

  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    }));

    get().saveItems();
  },

  setItemStatus: (id, status) => {
    const now = new Date().toISOString();
    
    set((state) => ({
      items: state.items.map(item => 
        item.id === id ? { 
          ...item, 
          status,
          ...(status === 'done' && { completedDate: now })
        } : item
      )
    }));

    get().saveItems();
  },

  setEditingItem: (item) => {
    set({ editingItem: item });
  },

  checkAndArchiveItems: () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    set((state) => {
      const itemsToArchive = state.items.filter(item => 
        item.status === 'done' && 
        item.completedDate && 
        new Date(item.completedDate) <= oneDayAgo
      );

      const remainingItems = state.items.filter(item => 
        !(item.status === 'done' && 
          item.completedDate && 
          new Date(item.completedDate) <= oneDayAgo)
      );

      return {
        items: remainingItems,
        archivedItems: [...state.archivedItems, ...itemsToArchive]
      };
    });

    get().saveItems();
  },

  getItemsByUser: (userName) => {
    const { items } = get();
    return items.filter(item => item.createdBy === userName);
  },

  getItemsByStatus: (status) => {
    const { items } = get();
    return items.filter(item => item.status === status);
  }
}));

export default useSellingStore;