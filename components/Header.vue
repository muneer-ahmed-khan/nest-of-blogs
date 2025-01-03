<script setup lang="ts">
// Props passed to the component
defineProps({
  topic: {
    type: Boolean,
    required: false,
  },
  topicName: {
    type: String,
    default: "",
  },
  topicCount: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div>
    <div v-if="topic" class="pt-24 px-12 mx-auto max-w-7xl">
      <div
        class="px-0.5 md:px-7 pt-6 mx-auto flex justify-between items-center"
      >
        <h3 class="text-2xl font-bold text-gray-700 dark:text-gray-200">
          {{ topicName }}
        </h3>
        <h4 class="text-xl dark:text-white">{{ topicCount }} Articles</h4>
      </div>
    </div>

    <div v-else class="pt-24 px-12 mx-auto max-w-7xl">
      <div class="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
        <p
          class="px-0 mb-2 text-lg font-bold text-gray-800 md:text-xl lg:px-24 dark:text-gray-300"
        >
          Nest-0f-Blogs
        </p>
        <h1
          class="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight dark:text-gray-50"
        >
          <span>Explore</span>
          <span
            class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-purple-500 lg:inline"
          >
            Learn
          </span>
          <span>Build 🚀</span>
        </h1>
      </div>
    </div>
  </div>
</template>
