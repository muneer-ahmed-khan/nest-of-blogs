<script setup lang="ts">
import { titleToSlug } from "~/utils";

const props = defineProps({
  articles: { type: Array, default: () => [] },
});

const featured  = computed(() => (props.articles as any[])[0]);
const rest       = computed(() => (props.articles as any[]).slice(1));

function getSlug(article: any) {
  return titleToSlug(article?.title ?? "");
}

function getTags(article: any): string[] {
  return article?.tags?.split(" ").filter(Boolean).slice(0, 3) ?? [];
}
</script>

<template>
  <div class="w-full" id="articles">

    <!-- Featured post (first article) -->
    <NuxtLink
      v-if="featured"
      :to="`/blogs/${getSlug(featured)}`"
      class="group block rounded-2xl border dark:border-teal-400/18 border-teal-600/18 overflow-hidden mb-12 no-underline transition-all duration-300 hover:-translate-y-1 relative"
      style="background: var(--featured-bg, #0a1a20);"
      :style="{
        '--featured-bg': '#0a1a20',
        boxShadow: 'none'
      }"
    >
      <!-- Top gradient bar -->
      <div class="h-0.5 w-full" style="background: linear-gradient(90deg, #2dd4bf, #fbbf24);"></div>

      <div class="grid md:grid-cols-2">
        <!-- Body -->
        <div class="p-5 sm:p-8 md:p-12 flex flex-col justify-center dark:bg-ocean-surface bg-white">
          <div class="flex items-center gap-2 mb-5">
            <span class="font-mono text-xs font-semibold tracking-widest uppercase" style="color: #2dd4bf;">
              <Icon name="mdi:rss" class="text-xs mr-1" />Latest Post
            </span>
          </div>

          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tag in getTags(featured)" :key="tag" class="tag-pill-amber">{{ tag }}</span>
          </div>

          <h2
            class="font-heading text-2xl md:text-3xl font-bold dark:text-white text-gray-900 leading-snug mb-4 group-hover:dark:text-teal-400 group-hover:text-teal-600 transition-colors"
          >{{ featured.title }}</h2>

          <p class="dark:text-gray-400 text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {{ featured.abstract }}
          </p>

          <div class="flex items-center gap-5 flex-wrap">
            <span class="flex items-center gap-1.5 text-sm dark:text-gray-400 text-gray-500">
              <Icon name="mdi:clock-outline" class="text-teal-400 dark:text-teal-400 text-teal-600 text-xs" />
              {{ featured.readingTime }}
            </span>
            <span class="flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400">
              Read article
              <Icon name="mdi:arrow-right" class="text-sm" />
            </span>
          </div>
        </div>

        <!-- Visual panel -->
        <div
          class="hidden md:flex items-center justify-center min-h-[240px] relative overflow-hidden dark:bg-ocean-surface2 bg-mist-surface2"
        >
          <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(45,212,191,0.06), rgba(251,191,36,0.04));"></div>
          <!-- Watermark article number -->
          <span
            class="font-heading font-bold absolute bottom-4 right-6 leading-none select-none dark:text-teal-400 text-teal-600"
            style="font-size: 120px; opacity: 0.06; letter-spacing: -0.04em;"
          >01</span>
          <!-- "Latest" label -->
          <span
            class="absolute top-6 left-6 font-mono text-xs font-semibold tracking-widest uppercase select-none dark:text-teal-400 text-teal-600"
            style="opacity: 0.35;"
          >Featured</span>
          <Icon name="bx:terminal" class="text-8xl relative z-10 dark:text-teal-400 text-teal-600" style="opacity: 0.25;" />
        </div>
      </div>
    </NuxtLink>

    <!-- Section heading -->
    <div v-if="rest.length" class="flex items-center gap-4 mb-8">
      <h2 class="font-heading text-xl font-bold dark:text-white text-gray-900 flex items-center gap-2">
        <Icon name="gridicons:menus" class="text-teal-400 dark:text-teal-400 text-teal-600 text-lg" />
        All Articles
      </h2>
      <div class="flex-1 h-px dark:bg-teal-400/15 bg-teal-600/15"></div>
    </div>

    <!-- Card grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="(article, index) in rest"
        :key="(article as any)._path + index"
        :to="`/blogs/${getSlug(article as any)}`"
        class="blog-card no-underline"
      >
        <!-- Card visual header -->
        <div class="h-32 dark:bg-ocean-surface2 bg-mist-surface2 flex items-center justify-center relative overflow-hidden flex-shrink-0">
          <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(45,212,191,0.05), rgba(251,191,36,0.03));"></div>
          <!-- Article number watermark -->
          <span
            class="font-heading font-bold opacity-[0.08] absolute bottom-2 right-4 leading-none dark:text-teal-400 text-teal-600"
            style="font-size: 72px;"
          >{{ String(index + 2).padStart(2, '0') }}</span>
          <!-- Topic label -->
          <span
            v-if="(article as any).topic"
            class="absolute top-3 left-3 font-mono text-xs font-semibold tracking-widest uppercase select-none dark:text-teal-400 text-teal-600"
            style="opacity: 0.4;"
          >{{ (article as any).topic }}</span>
          <Icon name="bx:terminal" class="text-4xl opacity-20 dark:text-teal-400 text-teal-600 relative z-10" />
        </div>

        <!-- Card body -->
        <div class="p-5 flex flex-col flex-1">
          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mb-3">
            <span v-for="tag in getTags(article as any)" :key="tag" class="tag-pill-amber">{{ tag }}</span>
          </div>

          <!-- Title -->
          <h3
            class="font-heading text-lg font-semibold dark:text-white text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:dark:text-teal-400 group-hover:text-teal-600 transition-colors"
            style="transition: color 0.2s ease;"
          >{{ (article as any).title }}</h3>

          <!-- Excerpt -->
          <p class="text-sm dark:text-gray-400 text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
            {{ (article as any).abstract }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-3 border-t dark:border-teal-400/10 border-teal-600/10">
            <span class="flex items-center gap-1.5 text-xs dark:text-gray-500 text-gray-400">
              <Icon name="mdi:clock-outline" class="dark:text-teal-400 text-teal-600 text-xs" />
              {{ (article as any).readingTime }}
            </span>
            <span class="read-arrow">
              <Icon name="mdi:arrow-right" class="text-sm" />
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>

  </div>
</template>
