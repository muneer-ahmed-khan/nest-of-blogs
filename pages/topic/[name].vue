<script lang="ts" setup>
import { useArticles } from "~/composables/useArticles";

const route = useRoute();
const topicName = route.params.name as string;

const { articles, error, fetchArticles } = useArticles();

// Fetch articles on mount
await fetchArticles(topicName);

// Set up SEO meta information
useSeoMeta({
  title: `${topicName} Articles | muneer.dev`,
  description: `All articles on ${topicName} — practical writing on backend development, from fundamentals to production patterns.`,
  ogTitle: `${topicName} Articles | muneer.dev`,
  ogDescription: `All articles on ${topicName} — practical writing on backend development, from fundamentals to production patterns.`,
  ogImage:
    "https://raw.githubusercontent.com/muneer-ahmed-khan/muneer-dev/master/public/sc.png",
  ogUrl: `https://muneer-dev.vercel.app/topic/${topicName}`,
  twitterTitle: `${topicName} Articles | muneer.dev`,
  twitterDescription: `All articles on ${topicName} — practical writing on backend development, from fundamentals to production patterns.`,
  twitterImage:
    "https://raw.githubusercontent.com/muneer-ahmed-khan/muneer-dev/master/public/sc.png",
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://muneer-dev.vercel.app/topic/${topicName}`,
    },
    { rel: "icon", type: "image/png", href: "/favicon.png" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <div>
    <Header
      :topic="true"
      :topicName="topicName"
      :topicCount="articles.length"
    />

    <div class="px-4 md:px-7 pb-20 mx-auto max-w-7xl">
      <BlogHeader :articles="articles" />
    </div>
  </div>
</template>
