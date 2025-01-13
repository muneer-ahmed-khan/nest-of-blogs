// store/index.ts
import { defineStore } from "pinia";

// Define the type for the state
interface State {
  user: {
    name: string | null;
    photo: string | null;
    token: string | null;
    uid: string | null;
  } | null;
}

// Define your store using Pinia (Nuxt 3 uses Pinia by default)
export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null, // Initial state, no user data
  }),

  // Define mutations (Pinia uses actions instead of mutations)
  actions: {
    setUser(user: {
      name: string | null;
      photo: string | null;
      token: string | null;
      uid: string | null;
    }) {
      this.user = user;
    },

    clearUser() {
      this.user = null;
    },
  },
});
