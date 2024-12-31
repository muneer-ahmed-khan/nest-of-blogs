<script setup lang="ts">
function calculateReadTime(body: any): string {
  const wordsPerMinute = 190;
  let wordCount = 0;

  function extractText(node: any) {
    if (node.type === "text") {
      wordCount += node.value.split(/\s+/).filter(Boolean).length;
    } else if (node.children) {
      node.children.forEach((child: any) => extractText(child));
    }
  }

  extractText(body);

  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

const articles = await queryContent().find();

articles.forEach((article) => {
  article.readingTime = calculateReadTime(article.body);
});

const contentQuery = await queryContent().find();

contentQuery.forEach((article) => {
  article.readingTime = calculateReadTime(article.body);
});
</script>

<template>
  <div class="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
    <div class="flex flex-wrap">
      <BlogHeader
        v-for="(content, index) in contentQuery"
        :key="index"
        :data="content"
        :readTime="content.readingTime"
      />
    </div>
  </div>
</template>
