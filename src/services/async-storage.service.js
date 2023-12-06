const STORAGE_KEY = 'watchers';

const asyncStorageService = {
  getAll: async () => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  },

  setAll: async (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  addItem: async (item) => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const data = storedData ? JSON.parse(storedData) : [];
    const updatedData = [...data, item];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  },

  removeItem: async (itemId) => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const data = storedData ? JSON.parse(storedData) : [];
    const updatedData = data.filter((item) => item.id !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  },

  updateItem: async (itemId, newData) => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const data = storedData ? JSON.parse(storedData) : [];
    const updatedData = data.map((item) => (item.id === itemId ? { ...item, ...newData } : item));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  },
};

export default asyncStorageService;
