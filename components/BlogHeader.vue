<template>
  <div
    @click="navigateToBlog"
    class="cursor-pointer group px-6 py-6 md:px-10 md:w-1/3 flex flex-col items-start rounded transform"
  >
    <!-- Tag -->
    <span
      class="inline-block py-1 px-2 rounded bg-gray-100 dark:bg-indigo-900 text-indigo-700 dark:text-gray-200 text-sm font-medium tracking-widest"
    >
      {{ data.tags?.split(" ")[0] }}
    </span>

    <!-- Title -->
    <h2
      class="sm:text-2xl text-xl title-font font-semibold text-gray-700 mt-4 mb-4 dark:text-gray-100 group-hover:text-indigo-800 dark:group-hover:text-indigo-400"
    >
      {{ data.title }}
    </h2>

    <!-- Abstract -->
    <p class="leading-relaxed mb-5 text-gray-800 dark:text-gray-200">
      {{ data.abstract }}..
    </p>

    <!-- Footer -->
    <div
      class="flex items-center flex-wrap pb-2 border-b-2 border-gray-300 mt-auto w-full justify-between dark:border-indigo-400"
    >
      <!-- Learn More -->
      <a
        class="text-indigo-700 inline-flex items-center dark:text-indigo-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-400"
      >
        Learn More
        <span class="pl-1 flex items-center">
          <Icon name="mdi:arrow-right" class="text-xl font-light" />
        </span>
      </a>

      <!-- Read Time -->
      <a class="inline-flex items-center">
        <span class="flex-grow flex flex-col pl-4">
          <span
            class="text-gray-900 text-xs tracking-widest mt-0.5 dark:text-indigo-300"
          >
            {{ readTime }}
          </span>
        </span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

// Props
defineProps({
  data: {
    type: Object,
  },
  readTime: {
    type: String,
  },
});

// Router instance
const router = useRouter();

// Generate the blog URL
const blogUrl = computed(
  () => `/blogs/${data.Title.split(" ").join("-").toLowerCase()}`
);

// Navigate to the blog page
const navigateToBlog = () => {
  router.push(blogUrl.value);
};
</script>
