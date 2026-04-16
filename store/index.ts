import { defineStore } from "pinia";

export interface StoreUser {
  name: string | null;
  photo: string | null;
  token: string | null;
  uid: string | null;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<StoreUser | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  function setUser(newUser: StoreUser) {
    user.value = newUser;
  }

  function clearUser() {
    user.value = null;
  }

  return { user, isLoggedIn, setUser, clearUser };
});
