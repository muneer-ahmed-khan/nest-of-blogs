<script setup lang="ts">
import { useArticles } from "~/composables/useArticles";

// Setup
const { articles, error, fetchArticles } = useArticles();
await fetchArticles();
</script>

<template>
  <Header />
  <div class="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
    <div class="flex flex-wrap">
      <BlogHeader :articles="articles" />
    </div>
  </div>
</template>
