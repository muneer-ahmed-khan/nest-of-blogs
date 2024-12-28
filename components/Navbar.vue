<template>
  <header
    class="fixed w-full border-t-4 bg-white dark:bg-dark border-indigo-600 dark:border-indigo-900 shadow dark:shadow-2 z-50"
  >
    <div class="container mx-auto px-6 py-5">
      <div class="flex items-center justify-between">
        <div class="flex">
          <NuxtLink to="/">
            <div
              class="flex items-center hover:text-indigo-600 text-gray-800 dark:text-gray-50"
            >
              <Icon name="bx:terminal" class="text-xl font-semibold" />
              <span class="mx-1 font-semibold text-base md:text-base">
                Latest
              </span>
            </div>
          </NuxtLink>

          <div class="dropdown inline-block relative mx-2 dark:bg-dark-300">
            <div
              class="flex items-center hover:text-indigo-600 text-gray-800 dark:text-gray-50 mx-6 cursor-pointer"
            >
              <Icon name="gridicons:menus" class="text-xl font-semibold" />
              <span class="mx-1 font-semibold text-base md:text-base">
                Posts
              </span>

              <Icon name="nrk:arrow-dropdown" size="24" />
            </div>
            <ul
              class="dropdown-menu absolute hidden text-gray-700 pt-1 bg-white dark:bg-customBlue w-40 rounded-xl left-1/3"
            >
              <li v-for="topic in topics" :key="topic" class="cursor-pointer">
                <NuxtLink
                  :to="`/topic/${topic}`"
                  class="rounded-xl bg-white dark:bg-customBlue text-gray-800 dark:text-gray-50 py-2 px-4 block whitespace-no-wrap"
                >
                  {{ topic }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-center -mx-3">
          <button
            class="flex items-center mx-2 lg:mx-4 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50"
            @click="toggleTheme"
            v-if="isColorModeResolved"
          >
            <Icon
              v-if="colorMode.value === 'dark'"
              name="tabler:sun-filled"
              class="text-lg"
            />

            <Icon v-else name="ion:moon" class="text-lg" />
          </button>

          <NuxtLink
            to="/about"
            class="flex items-center mx-2 lg:mx-4 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50"
          >
            <Icon name="gg:profile" class="text-lg" />
          </NuxtLink>

          <button
            class="flex items-center mx-2 lg:mx-4 text-base text-gray-800 hover:text-indigo-600 dark:text-gray-50"
          >
            <span
              v-if="isLogin"
              class="md:flex items-center"
              @click="handelSignOut"
            >
              <span class="hidden md:block text-sm font-medium">Sign Out</span>
              <!-- <IoLogOutOutline class="text-xl mx-1" /> -->
            </span>
            <span v-else class="md:flex items-center" @click="handelSignIn">
              <span class="hidden md:block text-sm font-medium">Sign In</span>
              <Icon name="dashicons:googleplus" class="mx-1 mt-1" size="16" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

import { ref } from "vue";

// Reactive variables
const isColorModeResolved = ref(false);
const topics = ref(["Technology", "Science", "Health"]); // Replace with dynamic topics
const isLogin = ref(false);

const toggleTheme = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

const handelSignIn = () => {
  console.log("Sign In logic here");
};

const handelSignOut = () => {
  console.log("Sign Out logic here");
};

// Ensure colorMode is resolved
onMounted(() => {
  isColorModeResolved.value = true;
});
</script>

<style scoped></style>
