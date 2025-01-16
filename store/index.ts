// store/index.ts
import { defineStore } from "pinia";

interface User {
  name: string | null;
  photo: string | null;
  token: string | null;
  uid: string | null;
}

interface State {
  user: User | null;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});
