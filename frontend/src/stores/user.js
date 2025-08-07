import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/me`, {
          credentials: 'include',
        });
        this.currentUser = res.ok ? await res.json() : null;
      } catch {
        this.currentUser = null;
      }
    },
    logout() {
      this.currentUser = null;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser?.isAdmin,
  },
});
