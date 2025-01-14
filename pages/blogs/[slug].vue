<script lang="ts" setup>
const route = useRoute();
const articleSlug = <string>route.params.slug;

import { useArticles } from "~/composables/useArticles";

// Setup
const { articles, error, fetchArticles } = useArticles();

await fetchArticles(undefined, articleSlug);

const article = articles.value?.[0];
</script>

<template>
  <div class="min-h-screen relative bg-white dark:bg-gray-900">
    <!-- Page Content -->
    <div class="py-24">
      <BlogInner :article="article" />
      <LikeBtn :id="article?.title?.split(' ')?.join('-')?.toLowerCase()" />
      <BlogShare :article="article" />
    </div>
  </div>
</template>
