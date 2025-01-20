<script lang="ts" setup>
import { useArticles } from "~/composables/useArticles";
const { articles, error, fetchArticles } = useArticles();

// Fetch dynamic data
const route = useRoute();
const topicName = <string>route.params.name;

// Fetch articles on mount
await fetchArticles(topicName);

// Set up SEO meta information
useSeoMeta({
  title: `${topicName} - Tech Blogs and Articles`,
  description: `Explore a variety of tech blogs and articles on ${topicName}, covering topics such as software development, web technologies, and more.`,
  ogTitle: `${topicName} - Tech Blogs and Articles`,
  ogDescription: `Explore a variety of tech blogs and articles on ${topicName}, covering topics such as software development, web technologies, and more.`,
  ogImage:
    "https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public/sc.png",
  ogUrl: `https://nest-of-blogs.vercel.app/topic/${topicName}`,
  twitterTitle: `${topicName} - Tech Blogs and Articles`,
  twitterDescription: `Explore a variety of tech blogs and articles on ${topicName}, covering topics such as software development, web technologies, and more.`,
  twitterImage:
    "https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public/sc.png",
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://nest-of-blogs.vercel.app/topic/${topicName}`,
    },
    { rel: "icon", type: "image/png", href: "/favicon.png" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
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
