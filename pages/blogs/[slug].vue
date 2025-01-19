<script lang="ts" setup>
const route = useRoute();
const articleSlug = <string>route.params.slug;

import { useArticles } from "~/composables/useArticles";

// Setup
const { articles, error, fetchArticles } = useArticles();

await fetchArticles(undefined, articleSlug);

const article = articles.value?.[0];
const articleImageURL = `https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public${article.headerImage}`;

useSeoMeta({
  title: article.title,
  description: article.abstract,
  ogTitle: article.title,
  ogDescription: article.abstract,
  ogImage: articleImageURL,
  ogUrl: "https://nest-of-blogs.vercel.app/",
  twitterTitle: article.title,
  twitterDescription: article.abstract,
  twitterImage: articleImageURL,
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://nest-of-blogs.vercel.app/${articleSlug}`,
    },
    { rel: "icon", type: "image/png", href: "/favicon.png" }, // Add favicon
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <div class="min-h-screen relative bg-white dark:bg-gray-900">
    <!-- Page Content -->
    <div class="py-24">
      <BlogInner :article="article" />
      <LikeBtn :id="articleSlug" />
      <BlogShare :article="article" />
      <Comments :id="articleSlug" />
    </div>
  </div>
</template>
