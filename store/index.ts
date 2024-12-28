// store/index.ts
import { defineStore } from "pinia";

// Define the type for the state
interface State {
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
  } | null;
}

// Define your store using Pinia (Nuxt 3 uses Pinia by default)
export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null, // Initial state, no user data
  }),

  // Define mutations (Pinia uses actions instead of mutations)
  actions: {
    setUser(user: { id: string; name: string; email: string }) {
      this.user = user;
    },

    clearUser() {
      this.user = null;
    },
  },
});
