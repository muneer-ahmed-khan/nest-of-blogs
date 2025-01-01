<script lang="ts" setup>
import { calculateReadTime } from "~/utils";

// Fetch dynamic data
const route = useRoute();
const { name } = route.params;

// Topic name from the route params
const topicName = <string>name;

const contentQuery = await queryContent().find();

contentQuery.forEach((article) => {
  article.readingTime = calculateReadTime(article.body);
});

// Computed property for filtering published blogs
const publishedArticles = computed(
  () =>
    contentQuery?.filter(
      (article) => article.isPublished && article.topic === name
    ) || []
);
</script>

<template>
  <div class="min-h-screen relative bg-white dark:bg-gray-900">
    <Header
      :topic="true"
      :topicCount="publishedArticles.length"
      :topicName="topicName"
    />

    <div class="px-0.5 md:px-7 pb-14 pt-6 mx-auto max-w-7xl">
      <div class="flex flex-wrap">
        <BlogHeader
          v-for="article in publishedArticles"
          :data="article"
          :readTime="article.readingTime"
        />
      </div>
    </div>
  </div>
</template>
