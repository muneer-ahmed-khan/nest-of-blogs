<script setup lang="ts">
defineProps({
  articles: Object,
});
</script>

<template>
  <NuxtLink
    v-for="(article, index) in articles"
    :key="article._path + index"
    :to="`/blogs/${String(
      article?.title?.split(' ')?.join('-')?.toLowerCase()
    )}`"
    class="cursor-pointer group px-6 py-6 md:px-10 md:w-1/3 flex flex-col items-start rounded transform"
  >
    <!-- Tag -->
    <span
      class="inline-block py-1 px-2 rounded bg-gray-100 dark:bg-indigo-900 text-indigo-700 dark:text-gray-200 text-sm font-medium tracking-widest"
    >
      {{ article?.tags?.split(" ")[0] }}
    </span>

    <!-- Title -->
    <h2
      class="sm:text-2xl text-xl title-font font-semibold text-gray-700 mt-4 mb-4 dark:text-gray-100 group-hover:text-indigo-800 dark:group-hover:text-indigo-400"
    >
      {{ article?.title }}
    </h2>

    <!-- Abstract -->
    <p class="leading-relaxed mb-5 text-gray-800 dark:text-gray-200">
      {{ article?.abstract }}..
    </p>

    <!-- Footer -->
    <div
      class="flex items-center flex-wrap pb-2 border-b-2 border-gray-300 mt-auto w-full justify-between dark:border-indigo-400"
    >
      <!-- Learn More -->
      <span
        class="text-indigo-700 inline-flex items-center dark:text-indigo-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-400"
      >
        Learn More
        <span class="pl-1 flex items-center">
          <Icon name="mdi:arrow-right" class="text-xl font-light" />
        </span>
      </span>

      <!-- Read Time -->
      <span class="inline-flex items-center">
        <span class="flex-grow flex flex-col pl-4">
          <span
            class="text-gray-900 text-xs tracking-widest mt-0.5 dark:text-indigo-300"
          >
            {{ article.readingTime }}
          </span>
        </span>
      </span>
    </div>
  </NuxtLink>
</template>
