<script setup lang="ts">
import { titleToSlug } from "~/utils";

const props = defineProps({
  article: { type: Object, required: true },
});

const articleSlug = computed(() => titleToSlug(props.article.title ?? ""));

const linkedinUrl = computed(
  () =>
    `https://www.linkedin.com/shareArticle?mini=true&url=https://muneer-dev.vercel.app/blogs/${articleSlug.value}&title=${encodeURIComponent(props.article.title)}`
);

const twitterUrl = computed(
  () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.article.title)}&url=https://muneer-dev.vercel.app/blogs/${articleSlug.value}`
);
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3 py-8">
    <span class="font-mono text-xs font-semibold tracking-wide uppercase dark:text-gray-500 text-gray-400">Share</span>

    <a
      :href="linkedinUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 no-underline bg-[rgba(45,212,191,0.1)] hover:bg-[rgba(45,212,191,0.2)] border border-[rgba(45,212,191,0.25)] text-teal-400 hover:-translate-y-px"
    >
      <Icon name="mdi:linkedin" class="text-base" />
      LinkedIn
    </a>

    <a
      :href="twitterUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 no-underline bg-[rgba(251,191,36,0.1)] hover:bg-[rgba(251,191,36,0.2)] border border-[rgba(251,191,36,0.25)] text-amber-400 hover:-translate-y-px"
    >
      <Icon name="mdi:twitter" class="text-base" />
      Twitter
    </a>
  </div>
</template>
