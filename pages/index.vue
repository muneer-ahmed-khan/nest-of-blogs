<script setup lang="ts">
import { calculateReadTime } from "~/utils";

const contentQuery = await queryContent().find();

contentQuery.forEach((article) => {
  article.readingTime = calculateReadTime(article.body);
});
</script>

<template>
  <Header />
  <div class="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
    <div class="flex flex-wrap">
      <BlogHeader
        v-for="(content, index) in contentQuery"
        :data="content"
        :readTime="content.readingTime"
      />
    </div>
  </div>
</template>
