<script setup lang="ts">
import { useArticles } from "~/composables/useArticles";

// Setup
const { articles, error, fetchArticles } = useArticles();
await fetchArticles();

useSeoMeta({
  title: "Nest of Blogs 🚀",
  description:
    "Tech blogs and articles on various topics related to Software Development",
  ogTitle: "Nest of Blogs 🚀",
  ogDescription:
    "Tech blogs and articles on various topics related to Software Development",
  ogImage:
    "https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public/sc.png",
  ogUrl: "https://nest-of-blogs.vercel.app/",
  twitterTitle: "Nest of Blogs 🚀",
  twitterDescription:
    "Tech blogs and articles on various topics related to Software Development",
  twitterImage:
    "https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public/sc.png",
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://nest-of-blogs.vercel.app/",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <Header />
  <div class="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
    <div class="flex flex-wrap">
      <BlogHeader :articles="articles" />
    </div>
  </div>
</template>
