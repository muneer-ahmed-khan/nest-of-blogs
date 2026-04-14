<script lang="ts" setup>
const { article } = defineProps({
  article: { type: Object, default: () => ({}) },
});

const tags = computed(() =>
  article?.tags?.split(" ").map((t: string) => t.trim()).filter(Boolean) ?? []
);

// Scroll progress
const scrollPct = ref(0);
function onScroll() {
  const el  = document.documentElement;
  const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  scrollPct.value = Math.min(100, Math.max(0, pct));
}
onMounted(()  => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <!-- Scroll progress -->
  <div class="scroll-progress-bar" :style="{ width: scrollPct + '%' }"></div>

  <div class="mx-auto max-w-screen-xl px-4 sm:px-6 flex gap-12 items-start">

    <!-- ── Main content ──────────────────────────────────────────── -->
    <div class="flex-1 min-w-0">

      <!-- Header image (real) -->
      <div v-if="article?.headerImage" class="relative overflow-hidden rounded-2xl mb-10 border dark:border-teal-400/15 border-teal-600/15">
        <img
          class="object-cover w-full h-56 sm:h-72"
          :src="article.headerImage"
          :alt="article.title"
        />
        <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(4,13,16,0.5), transparent 60%);"></div>
      </div>

      <!-- Header placeholder (no image) -->
      <div
        v-else
        class="relative overflow-hidden rounded-2xl mb-10 border dark:border-teal-400/15 border-teal-600/15 h-56 sm:h-64 flex items-center justify-center dark:bg-ocean-surface2 bg-mist-surface2"
      >
        <!-- Gradient overlay -->
        <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(45,212,191,0.07) 0%, rgba(251,191,36,0.04) 100%);"></div>
        <!-- Top gradient bar -->
        <div class="absolute top-0 left-0 right-0 h-0.5" style="background: linear-gradient(90deg, #2dd4bf, #fbbf24);"></div>
        <!-- Topic watermark -->
        <span
          v-if="article?.topic"
          class="absolute bottom-4 right-6 font-heading font-bold leading-none select-none dark:text-teal-400 text-teal-600"
          style="font-size: 96px; opacity: 0.055; letter-spacing: -0.04em;"
        >{{ article.topic }}</span>
        <!-- Centre icon -->
        <div class="relative z-10 flex flex-col items-center gap-4">
          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center"
            style="background: rgba(45,212,191,0.1); border: 1px solid rgba(45,212,191,0.2);"
          >
            <Icon name="bx:terminal" class="text-3xl dark:text-teal-400 text-teal-600" />
          </div>
          <span
            v-if="article?.topic"
            class="font-mono text-xs font-semibold uppercase tracking-widest dark:text-teal-400 text-teal-600"
            style="opacity: 0.6;"
          >{{ article.topic }}</span>
        </div>
      </div>

      <div class="mt-4">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-5">
          <span v-for="tag in tags" :key="tag" class="tag-pill-amber">{{ tag }}</span>
        </div>

        <!-- Title -->
        <h1 class="font-heading text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 leading-tight tracking-tight mb-4">
          {{ article?.title }}
        </h1>

        <!-- Meta bar -->
        <div
          class="inline-flex items-center flex-wrap gap-5 px-5 py-3 rounded-xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface bg-mist-surface2 mb-8 text-sm"
        >
          <span class="flex items-center gap-1.5 dark:text-gray-400 text-gray-500">
            <Icon name="mdi:clock-outline" class="dark:text-teal-400 text-teal-600 text-xs" />
            {{ article?.readingTime }}
          </span>
          <span
            v-if="article?.topic"
            class="flex items-center gap-1.5 dark:text-gray-400 text-gray-500"
          >
            <Icon name="gridicons:menus" class="dark:text-teal-400 text-teal-600 text-xs" />
            {{ article.topic }}
          </span>
          <span
            v-if="article?.author"
            class="flex items-center gap-1.5 dark:text-gray-400 text-gray-500"
          >
            <Icon name="gg:profile" class="dark:text-teal-400 text-teal-600 text-xs" />
            {{ article.author }}
          </span>
        </div>

        <hr class="border-0 border-t dark:border-teal-400/10 border-teal-600/10 mb-8" />

        <!-- Article body -->
        <article class="prose prose-lg dark:prose-dark max-w-none article-body
          prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:leading-[1.85] prose-p:dark:text-gray-300 prose-p:text-gray-700
          prose-li:dark:text-gray-300 prose-li:text-gray-700
          prose-pre:rounded-xl prose-pre:text-sm
          prose-img:rounded-xl prose-img:border prose-img:dark:border-teal-400/15 prose-img:border-teal-600/15
          prose-hr:dark:border-teal-400/10 prose-hr:border-teal-600/10
        ">
          <ContentRenderer :value="article" />
        </article>

        <!-- Author footer -->
        <div class="mt-14 pt-8 border-t dark:border-teal-400/10 border-teal-600/10 flex flex-col items-center text-center">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style="background: rgba(45,212,191,0.12); border: 1px solid rgba(45,212,191,0.25);"
          >
            <Icon name="gg:profile" class="text-xl dark:text-teal-400 text-teal-600" />
          </div>
          <p class="font-heading text-lg font-semibold dark:text-white text-gray-900 mb-0.5">
            {{ article?.author }}
          </p>
          <p class="text-sm dark:text-gray-500 text-gray-400 mb-4">Author</p>
          <p class="dark:text-gray-400 text-gray-500 text-sm">Thanks for reading. If it helped, or if something seems off, feel free to reach out.</p>
        </div>
      </div>
    </div>

    <!-- ── TOC sidebar ───────────────────────────────────────────── -->
    <div class="toc w-56 flex-shrink-0">
      <TableOfContent :toc="article.body?.toc" />
    </div>
  </div>
</template>
