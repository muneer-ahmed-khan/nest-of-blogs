<script setup lang="ts">
import { titleToSlug } from "~/utils";

const props = defineProps({
  article: { type: Object, required: true },
});

const articleSlug = computed(() => titleToSlug(props.article.title ?? ""));

const linkedinUrl = computed(
  () => `https://www.linkedin.com/shareArticle?mini=true&url=https://nest-of-blogs.vercel.app/blogs/${articleSlug.value}&title=${encodeURIComponent(props.article.title)}`
);

const twitterUrl = computed(
  () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.article.title)}&url=https://nest-of-blogs.vercel.app/blogs/${articleSlug.value}`
);
</script>

<template>
  <div class="flex items-center justify-center gap-3 py-8">
    <span class="text-sm dark:text-gray-500 text-gray-400 font-mono tracking-wide uppercase text-xs font-semibold">Share</span>

    <a
      :href="linkedinUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 no-underline"
      style="background: rgba(45,212,191,0.1); border: 1px solid rgba(45,212,191,0.25); color: #2dd4bf;"
      onmouseover="this.style.background='rgba(45,212,191,0.2)'; this.style.transform='translateY(-1px)';"
      onmouseout="this.style.background='rgba(45,212,191,0.1)'; this.style.transform='translateY(0)';"
    >
      <Icon name="mdi:linkedin" class="text-base" />
      LinkedIn
    </a>

    <a
      :href="twitterUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 no-underline"
      style="background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.25); color: #fbbf24;"
      onmouseover="this.style.background='rgba(251,191,36,0.2)'; this.style.transform='translateY(-1px)';"
      onmouseout="this.style.background='rgba(251,191,36,0.1)'; this.style.transform='translateY(0)';"
    >
      <Icon name="mdi:twitter" class="text-base" />
      Twitter
    </a>
  </div>
</template>
