<script setup lang="ts">
import { useArticles } from "~/composables/useArticles";
import { SERIES_POSTS, EXPRESS_POSTS, NODE_POSTS } from '~/composables/useGithubSeries'

const { articles, error, fetchArticles } = useArticles();
await fetchArticles();

// Show 3 featured series posts (one from each series start + one Node)
const seriesPreview = computed(() => [
  SERIES_POSTS.find(p => p.slug === 'node-09-event-loop')!,
  SERIES_POSTS.find(p => p.slug === 'express-01-getting-started')!,
  SERIES_POSTS.find(p => p.slug === 'node-01-basics')!,
].filter(Boolean))

useSeoMeta({
  title: "muneer.dev | Node.js, Express and TypeScript Blog",
  description: "Practical articles on Node.js, Express, and TypeScript. From core concepts to production patterns, written by a backend developer for developers.",
  ogTitle: "muneer.dev | Node.js, Express and TypeScript Blog",
  ogDescription: "Practical articles on Node.js, Express, and TypeScript. From core concepts to production patterns, written by a backend developer for developers.",
  ogImage: "https://raw.githubusercontent.com/muneer-ahmed-khan/muneer-dev/master/public/sc.png",
  ogUrl: "https://muneer-dev.vercel.app/",
  twitterTitle: "muneer.dev | Node.js, Express and TypeScript Blog",
  twitterDescription: "Practical articles on Node.js, Express, and TypeScript. From core concepts to production patterns, written by a backend developer for developers.",
  twitterImage: "https://raw.githubusercontent.com/muneer-ahmed-khan/muneer-dev/master/public/sc.png",
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

useHead({
  link: [
    { rel: "canonical", href: "https://muneer-dev.vercel.app/" },
    { rel: "icon", type: "image/png", href: "/favicon.png" },
  ],
  htmlAttrs: { lang: "en" },
});
</script>

<template>
  <div>
    <Header />
    <div class="px-4 md:px-7 pb-20 mx-auto max-w-7xl">
      <BlogHeader :articles="articles" />

      <!-- ── GitHub Series Preview ─────────────────────────────────── -->
      <section class="mt-20">
        <!-- Section header -->
        <div class="flex items-center justify-between mb-10">
          <div class="flex items-center gap-4">
            <h2 class="font-heading text-xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
              <Icon name="mdi:github" class="dark:text-teal-400 text-teal-600 text-lg" />
              GitHub Series
            </h2>
            <div class="hidden sm:block w-24 h-px dark:bg-teal-400/15 bg-teal-600/15"></div>
            <div class="flex items-center gap-2">
              <span class="tag-pill-teal">{{ NODE_POSTS.length }} Node.js</span>
              <span class="tag-pill-amber">{{ EXPRESS_POSTS.length }} Express</span>
            </div>
          </div>
          <NuxtLink
            to="/series"
            class="hidden sm:flex items-center gap-1.5 text-sm font-semibold dark:text-teal-400 text-teal-600 hover:gap-2.5 transition-all duration-200 no-underline"
          >
            View all {{ SERIES_POSTS.length }} articles
            <Icon name="mdi:arrow-right" class="text-sm" />
          </NuxtLink>
        </div>

        <!-- Banner card -->
        <div
          class="relative rounded-2xl border dark:border-teal-400/18 border-teal-600/18 overflow-hidden mb-8 p-5 sm:p-8 md:p-12"
          style="background: linear-gradient(135deg, rgba(45,212,191,0.06) 0%, rgba(251,191,36,0.03) 100%);"
        >
          <!-- Gradient bar -->
          <div class="absolute top-0 left-0 right-0 h-0.5" style="background: linear-gradient(90deg,#2dd4bf,#fbbf24);"></div>

          <div class="flex flex-col md:flex-row md:items-center gap-6">
            <!-- Left: text -->
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-3">
                <Icon name="mdi:github" class="dark:text-teal-400 text-teal-600 text-xl" />
                <span class="font-mono text-xs font-semibold tracking-widest uppercase dark:text-teal-400 text-teal-600">
                  Live from GitHub
                </span>
              </div>
              <h3 class="font-heading text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mb-3">
                TypeScript Deep-Dive Series
              </h3>
              <p class="dark:text-gray-400 text-gray-500 text-sm leading-relaxed max-w-lg">
                {{ SERIES_POSTS.length }} articles on Node.js and Express, pulled live from GitHub so the code is always current.
              </p>
              <div class="flex flex-wrap items-center gap-3 mt-5">
                <NuxtLink to="/series" class="btn-ocean no-underline">
                  <Icon name="mdi:book-open-outline" />
                  All Series
                </NuxtLink>
                <NuxtLink to="/series?filter=nodejs" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border dark:border-teal-400/25 border-teal-600/25 dark:text-gray-300 text-gray-600 hover:dark:border-teal-400/50 hover:border-teal-600/50 transition-all duration-200 no-underline">
                  <Icon name="mdi:nodejs" class="dark:text-teal-400 text-teal-600" />
                  Node.js Series
                </NuxtLink>
                <NuxtLink to="/series?filter=express" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border dark:border-amber-400/25 border-amber-600/25 dark:text-gray-300 text-gray-600 hover:dark:border-amber-400/50 hover:border-amber-600/50 transition-all duration-200 no-underline">
                  <Icon name="bx:terminal" class="text-amber-400 dark:text-amber-400 text-amber-600" />
                  Express Series
                </NuxtLink>
              </div>
            </div>

            <!-- Right: stats grid -->
            <div class="grid grid-cols-2 gap-3 md:w-56 flex-shrink-0">
              <div class="rounded-xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface/60 bg-white/60 p-4 text-center">
                <div class="font-heading text-3xl font-bold dark:text-teal-400 text-teal-600">{{ NODE_POSTS.length }}</div>
                <div class="text-xs dark:text-gray-500 text-gray-400 mt-1">Node.js</div>
              </div>
              <div class="rounded-xl border dark:border-amber-400/15 border-amber-600/15 dark:bg-ocean-surface/60 bg-white/60 p-4 text-center">
                <div class="font-heading text-3xl font-bold text-amber-400 dark:text-amber-400 text-amber-600">{{ EXPRESS_POSTS.length }}</div>
                <div class="text-xs dark:text-gray-500 text-gray-400 mt-1">Express</div>
              </div>
              <div class="col-span-2 rounded-xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface/60 bg-white/60 p-4 text-center">
                <div class="font-heading text-3xl font-bold dark:text-white text-gray-900">{{ SERIES_POSTS.length }}</div>
                <div class="text-xs dark:text-gray-500 text-gray-400 mt-1">Total Articles</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview cards -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="post in seriesPreview"
            :key="post.slug"
            :to="`/series/${post.slug}`"
            class="blog-card no-underline"
          >
            <div class="h-28 dark:bg-ocean-surface2 bg-mist-surface2 flex items-center justify-center relative overflow-hidden flex-shrink-0">
              <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(45,212,191,0.05),rgba(251,191,36,0.03));"></div>
              <span class="font-heading font-bold opacity-[0.08] absolute bottom-1 right-3 leading-none dark:text-teal-400 text-teal-600" style="font-size:68px;">
                {{ String(post.seriesNumber).padStart(2,'0') }}
              </span>
              <Icon name="mdi:github" class="text-3xl opacity-20 dark:text-teal-400 text-teal-600 relative z-10" />
            </div>
            <div class="p-5 flex flex-col flex-1">
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span :class="post.seriesType === 'nodejs' ? 'tag-pill-teal' : 'tag-pill-amber'">
                  {{ post.seriesType === 'nodejs' ? 'Node.js' : 'Express' }} #{{ String(post.seriesNumber).padStart(2,'0') }}
                </span>
              </div>
              <h3 class="font-heading text-lg font-semibold dark:text-white text-gray-900 leading-snug mb-2 line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="text-sm dark:text-gray-400 text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between pt-3 border-t dark:border-teal-400/10 border-teal-600/10">
                <span class="flex items-center gap-1.5 text-xs dark:text-gray-500 text-gray-400">
                  <Icon name="mdi:clock-outline" class="dark:text-teal-400 text-teal-600 text-xs" />
                  {{ post.readTimeMinutes }} min read
                </span>
                <span class="read-arrow"><Icon name="mdi:arrow-right" class="text-sm" /></span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Mobile "View all" link -->
        <div class="sm:hidden flex justify-center mt-8">
          <NuxtLink
            to="/series"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border dark:border-teal-400/25 border-teal-600/25 dark:text-teal-400 text-teal-600 text-sm font-semibold no-underline transition-all duration-200"
          >
            View all {{ SERIES_POSTS.length }} series articles
            <Icon name="mdi:arrow-right" />
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
