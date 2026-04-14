<script lang="ts" setup>
import { useArticles } from "~/composables/useArticles";

const route       = useRoute();
const articleSlug = route.params.slug as string;

const { articles, error, fetchArticles } = useArticles();
await fetchArticles(undefined, articleSlug);

const article = articles.value?.[0];

if (!article) {
  throw createError({ statusCode: 404, message: "Article not found" });
}

const articleImageURL = article.headerImage
  ? `https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public${article.headerImage}`
  : "";

useSeoMeta({
  title: article.title,
  description: article.abstract,
  ogTitle: article.title,
  ogDescription: article.abstract,
  ogImage: articleImageURL,
  ogUrl: `https://nest-of-blogs.vercel.app/blogs/${articleSlug}`,
  twitterTitle: article.title,
  twitterDescription: article.abstract,
  twitterImage: articleImageURL,
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

useHead({
  link: [
    { rel: "canonical", href: `https://nest-of-blogs.vercel.app/${articleSlug}` },
    { rel: "icon", type: "image/png", href: "/favicon.png" },
  ],
  htmlAttrs: { lang: "en" },
});
</script>

<template>
  <div class="pt-24 pb-20">
    <BlogInner :article="article" />
    <LikeBtn :id="articleSlug" />
    <BlogShare :article="article" />
    <Comments :id="articleSlug" />
  </div>
</template>
