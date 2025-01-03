<script lang="ts" setup>
import { useArticles } from "~/composables/useArticles";
const { articles, error, fetchArticles } = useArticles();

// Fetch dynamic data
const route = useRoute();
const topicName = <string>route.params.name;

// Fetch articles on mount
await fetchArticles(topicName);
</script>

<template>
  <div class="min-h-screen relative bg-white dark:bg-gray-900">
    <Header
      :topic="true"
      :topicName="topicName"
      :topicCount="articles.length"
    />

    <div class="px-0.5 md:px-7 pb-14 pt-6 mx-auto max-w-7xl">
      <div class="flex flex-wrap">
        <BlogHeader :articles="articles" />
      </div>
    </div>
  </div>
</template>
