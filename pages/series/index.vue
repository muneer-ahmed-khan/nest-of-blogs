<script setup lang="ts">
import { SERIES_POSTS, EXPRESS_POSTS, NODE_POSTS } from '~/composables/useGithubSeries'

type Filter = 'all' | 'nodejs' | 'express'
const activeFilter = ref<Filter>('all')

const displayed = computed(() => {
  if (activeFilter.value === 'all')    return SERIES_POSTS
  if (activeFilter.value === 'nodejs') return NODE_POSTS
  return EXPRESS_POSTS
})

const featured = computed(() => displayed.value[0])
const rest      = computed(() => displayed.value.slice(1))

useSeoMeta({
  title: 'GitHub Series — TypeScript Node.js & Express',
  description: 'Deep-dive series on TypeScript, Node.js, and Express pulled live from GitHub.',
})
useHead({ link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }] })
</script>

<template>
  <div>
    <!-- Hero header -->
    <div class="pt-32 pb-12 px-6 text-center">
      <div class="max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 mb-5 animate-fade-up">
          <Icon name="mdi:github" class="dark:text-teal-400 text-teal-600 text-lg" />
          <span class="font-mono text-xs font-semibold tracking-widest uppercase dark:text-teal-400 text-teal-600">
            From GitHub
          </span>
        </div>
        <h1 class="font-heading text-5xl md:text-6xl font-bold leading-tight tracking-tight dark:text-white text-gray-900 mb-5 animate-fade-up-2">
          TypeScript<br />
          <span class="bg-clip-text text-transparent" style="background-image: linear-gradient(135deg,#2dd4bf,#fbbf24);">
            Series
          </span>
        </h1>
        <p class="text-lg dark:text-gray-400 text-gray-500 max-w-xl mx-auto leading-relaxed animate-fade-up-3">
          20 hands-on articles across Node.js and Express — fetched live from GitHub repos, always up to date.
        </p>

        <!-- Stats pills -->
        <div class="flex items-center justify-center gap-3 mt-8 flex-wrap animate-fade-up-3">
          <span class="tag-pill-teal">
            <Icon name="mdi:nodejs" class="mr-1" /> {{ NODE_POSTS.length }} Node.js articles
          </span>
          <span class="tag-pill-amber">
            <Icon name="bx:terminal" class="mr-1" /> {{ EXPRESS_POSTS.length }} Express articles
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border dark:border-teal-400/25 border-teal-600/25 dark:text-gray-400 text-gray-500">
            <Icon name="mdi:github" /> Live from GitHub
          </span>
        </div>
      </div>
    </div>

    <div class="px-4 md:px-7 pb-20 mx-auto max-w-7xl">

      <!-- Filter chips -->
      <div class="flex items-center justify-center gap-2 flex-wrap mb-10">
        <span class="text-xs font-semibold dark:text-gray-500 text-gray-400 uppercase tracking-wider mr-1">Filter:</span>
        <button
          v-for="f in ([
            { id: 'all',     label: 'All Posts',       count: SERIES_POSTS.length },
            { id: 'nodejs',  label: 'Node.js Series',  count: NODE_POSTS.length },
            { id: 'express', label: 'Express Series',  count: EXPRESS_POSTS.length },
          ] as const)"
          :key="f.id"
          @click="activeFilter = f.id"
          :class="[
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
            activeFilter === f.id
              ? f.id === 'express'
                ? 'bg-amber-400 border-amber-400 text-gray-900'
                : 'bg-teal-400 dark:bg-teal-400 border-teal-400 text-gray-900'
              : 'dark:border-teal-400/20 border-teal-600/20 dark:text-gray-400 text-gray-500 hover:dark:border-teal-400/50 hover:border-teal-600/50 hover:dark:text-teal-400 hover:text-teal-600'
          ]"
        >
          {{ f.label }}
          <span
            class="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            :style="activeFilter === f.id ? 'background:rgba(0,0,0,0.15)' : 'background:rgba(45,212,191,0.1); color: #2dd4bf'"
          >{{ f.count }}</span>
        </button>
      </div>

      <!-- Featured post -->
      <NuxtLink
        v-if="featured"
        :to="`/series/${featured.slug}`"
        class="group block rounded-2xl border overflow-hidden mb-12 no-underline transition-all duration-300 hover:-translate-y-1 relative dark:border-teal-400/18 border-teal-600/18"
      >
        <div class="h-0.5 w-full" style="background:linear-gradient(90deg,#2dd4bf,#fbbf24);"></div>
        <div class="grid md:grid-cols-2">
          <!-- Body -->
          <div class="p-8 md:p-12 flex flex-col justify-center dark:bg-ocean-surface bg-white">
            <div class="flex items-center gap-2 mb-5">
              <Icon name="mdi:star-four-points" class="dark:text-teal-400 text-teal-600 text-sm" />
              <span class="font-mono text-xs font-semibold tracking-widest uppercase dark:text-teal-400 text-teal-600">
                Featured · {{ featured.seriesLabel }}
              </span>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              <span :class="featured.seriesType === 'nodejs' ? 'tag-pill-teal' : 'tag-pill-amber'">
                #{{ String(featured.seriesNumber).padStart(2, '0') }}
              </span>
              <span v-for="tag in featured.tags.slice(0, 3)" :key="tag" class="tag-pill-amber">{{ tag }}</span>
            </div>
            <h2 class="font-heading text-2xl md:text-3xl font-bold dark:text-white text-gray-900 leading-snug mb-4 group-hover:dark:text-teal-400 group-hover:text-teal-600 transition-colors">
              {{ featured.title }}
            </h2>
            <p class="dark:text-gray-400 text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{{ featured.excerpt }}</p>
            <div class="flex items-center gap-5 flex-wrap">
              <span class="flex items-center gap-1.5 text-sm dark:text-gray-400 text-gray-500">
                <Icon name="mdi:clock-outline" class="dark:text-teal-400 text-teal-600 text-xs" />
                {{ featured.readTimeMinutes }} min read
              </span>
              <span class="flex items-center gap-1.5 text-sm font-semibold dark:text-teal-400 text-teal-600">
                Read article <Icon name="mdi:arrow-right" class="text-sm" />
              </span>
            </div>
          </div>
          <!-- Visual -->
          <div class="hidden md:flex items-center justify-center min-h-[240px] relative overflow-hidden dark:bg-ocean-surface2 bg-mist-surface2">
            <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(45,212,191,0.06),rgba(251,191,36,0.04));"></div>
            <Icon name="mdi:github" class="text-8xl opacity-10 dark:text-teal-400 text-teal-600 relative z-10" />
            <span class="font-heading font-bold opacity-[0.06] absolute bottom-3 right-5 leading-none dark:text-teal-400 text-teal-600" style="font-size:96px;">
              {{ String(featured.seriesNumber).padStart(2,'0') }}
            </span>
          </div>
        </div>
      </NuxtLink>

      <!-- Section label -->
      <div v-if="rest.length" class="flex items-center gap-4 mb-8">
        <h2 class="font-heading text-xl font-semibold dark:text-white text-gray-900 flex items-center gap-2">
          <Icon name="gridicons:menus" class="dark:text-teal-400 text-teal-600" />
          All {{ activeFilter === 'all' ? 'Series' : (activeFilter === 'nodejs' ? 'Node.js' : 'Express') }} Articles
        </h2>
        <div class="flex-1 h-px dark:bg-teal-400/15 bg-teal-600/15"></div>
      </div>

      <!-- Card grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, i) in rest"
          :key="post.slug"
          :to="`/series/${post.slug}`"
          class="blog-card no-underline"
        >
          <!-- Card visual -->
          <div class="h-32 dark:bg-ocean-surface2 bg-mist-surface2 flex items-center justify-center relative overflow-hidden flex-shrink-0">
            <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(45,212,191,0.05),rgba(251,191,36,0.03));"></div>
            <span class="font-heading font-bold opacity-[0.08] absolute bottom-2 right-3 leading-none dark:text-teal-400 text-teal-600" style="font-size:72px;">
              {{ String(post.seriesNumber).padStart(2,'0') }}
            </span>
            <Icon name="mdi:github" class="text-4xl opacity-20 dark:text-teal-400 text-teal-600 relative z-10" />
          </div>
          <!-- Card body -->
          <div class="p-5 flex flex-col flex-1">
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span :class="post.seriesType === 'nodejs' ? 'tag-pill-teal' : 'tag-pill-amber'">
                {{ post.seriesLabel.replace('TypeScript ', '') }} #{{ String(post.seriesNumber).padStart(2,'0') }}
              </span>
              <span v-for="tag in post.tags.slice(0, 1)" :key="tag" class="tag-pill-amber">{{ tag }}</span>
            </div>
            <h3 class="font-heading text-base font-semibold dark:text-white text-gray-900 leading-snug mb-2 line-clamp-2 transition-colors duration-200">
              {{ post.title }}
            </h3>
            <p class="text-sm dark:text-gray-400 text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">{{ post.excerpt }}</p>
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

    </div>
  </div>
</template>
