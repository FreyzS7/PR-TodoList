import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  notification: null,

  login: (name) => {
    const validUsers = {
      'Jiro': 'Buyer',
      'Ajiz': 'Seller'
    };

    if (validUsers[name]) {
      const userData = {
        name,
        role: validUsers[name],
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('auth', JSON.stringify(userData));
      
      set({
        user: userData,
        role: validUsers[name],
        isAuthenticated: true,
        notification: null
      });
      
      return true;
    } else {
      set({
        notification: {
          type: 'error',
          message: 'Unauthorized user. Only Jiro and Ajiz are allowed.'
        }
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('auth');
    set({
      user: null,
      role: null,
      isAuthenticated: false,
      notification: null
    });
  },

  loadAuth: () => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const userData = JSON.parse(authData);
      set({
        user: userData,
        role: userData.role,
        isAuthenticated: true
      });
    }
  },

  clearNotification: () => {
    set({ notification: null });
  },

  setNotification: (notification) => {
    set({ notification });
  }
}));

export default useAuthStore;