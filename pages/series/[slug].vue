<script setup lang="ts">
const route  = useRoute()
const slug   = route.params.slug as string

const { loading, error, findPost, adjacentPosts, fetchPostContent } = useGithubSeries()

const post         = ref<any>(null)
const toc          = ref<Array<{ id: string; text: string; level: number }>>([])
const activeTocId  = ref('')
const scrollPct    = ref(0)
const copiedId     = ref<string | null>(null)
const source       = findPost(slug)
const adjacent     = adjacentPosts(slug)

if (!source) {
  throw createError({ statusCode: 404, message: 'Series post not found' })
}

useSeoMeta({
  title: source.title + ' | ' + source.seriesLabel,
  description: source.excerpt,
})
useHead({ link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }] })

// ── Build TOC ─────────────────────────────────────────────────────
function buildToc(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html
  toc.value = Array.from(div.querySelectorAll('h1,h2,h3,h4'))
    .map(h => ({ id: h.id || '', text: h.textContent?.trim() ?? '', level: parseInt(h.tagName[1]) }))
    .filter(t => t.id)
}

// ── Scroll tracking ───────────────────────────────────────────────
function onScroll() {
  const el = document.documentElement
  scrollPct.value = Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
  for (let i = toc.value.length - 1; i >= 0; i--) {
    const el = document.getElementById(toc.value[i].id)
    if (el && el.getBoundingClientRect().top <= 112) { activeTocId.value = toc.value[i].id; return }
  }
  activeTocId.value = ''
}

// ── Enhance code blocks ───────────────────────────────────────────
async function enhanceCodeBlocks() {
  await nextTick()
  const content = document.querySelector('.series-article')
  if (!content) return
  content.querySelectorAll('pre').forEach((pre, i) => {
    if (pre.closest('.code-wrap')) return
    const code = pre.querySelector('code')
    const lang = code?.className.match(/language-(\w+)/)?.[1] ?? 'code'
    pre.setAttribute('data-lang', lang)
    const wrap = document.createElement('div')
    wrap.className = 'code-wrap'
    wrap.style.cssText = 'position:relative;'
    pre.parentNode?.insertBefore(wrap, pre)
    wrap.appendChild(pre)
    const btn = document.createElement('button')
    btn.className = 'copy-code-btn'
    btn.textContent = 'Copy'
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(code?.textContent ?? '').then(() => {
        btn.textContent = 'Copied!'
        btn.style.color = '#4ade80'
        setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = '' }, 2000)
      })
    })
    wrap.appendChild(btn)
  })
}

onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const result = await fetchPostContent(slug)
  if (result) {
    post.value = result
    await nextTick()
    buildToc(result.htmlContent)
    await enhanceCodeBlocks()
  }
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Scroll progress -->
    <div class="scroll-progress-bar" :style="{ width: scrollPct + '%' }"></div>

    <div class="pt-24 pb-20">

      <!-- ── SKELETON ─────────────────────────────────────────── -->
      <template v-if="loading && !post">
        <div class="container mx-auto px-4 sm:px-6 max-w-screen-xl">
          <div class="py-10">
            <div class="h-4 rounded shimmer w-48 mb-6"></div>
            <div class="h-10 rounded-lg shimmer w-3/4 mb-4"></div>
            <div class="h-10 rounded-lg shimmer w-1/2 mb-8"></div>
            <div class="h-14 rounded-xl shimmer w-96"></div>
          </div>
          <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div class="flex-1 space-y-4">
              <div v-for="n in 8" :key="n">
                <div class="space-y-2 mb-6">
                  <div class="h-4 rounded shimmer w-full"></div>
                  <div class="h-4 rounded shimmer w-11/12"></div>
                  <div class="h-4 rounded shimmer w-4/5"></div>
                </div>
                <div v-if="n % 3 === 0" class="h-40 rounded-xl shimmer mb-6"></div>
              </div>
            </div>
            <div class="toc w-56 flex-shrink-0">
              <div class="h-64 rounded-2xl shimmer"></div>
            </div>
          </div>
        </div>
      </template>

      <!-- ── ERROR ────────────────────────────────────────────── -->
      <div v-else-if="error && !post" class="text-center py-20 px-6">
        <div class="text-6xl mb-6 opacity-40">⚡</div>
        <h2 class="font-heading text-2xl font-bold dark:text-white text-gray-900 mb-3">Couldn't load this post</h2>
        <p class="dark:text-gray-400 text-gray-500 mb-8">{{ error }}. GitHub may be temporarily unavailable.</p>
        <button
          @click="fetchPostContent(slug).then(r => { if (r) post.value = r })"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border dark:border-teal-400/30 border-teal-600/30 dark:text-teal-400 text-teal-600 font-medium transition-all duration-200 hover:dark:bg-teal-400/10 hover:bg-teal-600/8"
        >
          <Icon name="mdi:reload" /> Try again
        </button>
        <div class="mt-6">
          <NuxtLink to="/series" class="dark:text-teal-400 text-teal-600 text-sm inline-flex items-center gap-1.5 no-underline hover:underline">
            <Icon name="mdi:arrow-left" /> Back to series
          </NuxtLink>
        </div>
      </div>

      <!-- ── ARTICLE ───────────────────────────────────────────── -->
      <template v-else-if="post">
        <div class="container mx-auto px-4 sm:px-6 max-w-screen-xl">

          <!-- Post hero -->
          <header class="py-10 border-b dark:border-teal-400/10 border-teal-600/10 mb-0">
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-sm dark:text-gray-500 text-gray-400 mb-6 flex-wrap">
              <NuxtLink to="/" class="hover:dark:text-teal-400 hover:text-teal-600 transition-colors no-underline">Blog</NuxtLink>
              <Icon name="mdi:chevron-right" class="text-xs opacity-50" />
              <NuxtLink to="/series" class="hover:dark:text-teal-400 hover:text-teal-600 transition-colors no-underline">Series</NuxtLink>
              <Icon name="mdi:chevron-right" class="text-xs opacity-50" />
              <span :class="post.seriesType === 'nodejs' ? 'tag-pill-teal' : 'tag-pill-amber'" style="font-size:11px;">
                {{ post.seriesLabel }}
              </span>
            </nav>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-5">
              <span :class="post.seriesType === 'nodejs' ? 'tag-pill-teal' : 'tag-pill-amber'">
                {{ post.seriesLabel }} #{{ String(post.seriesNumber).padStart(2, '0') }}
              </span>
              <span v-for="tag in post.tags" :key="tag" class="tag-pill-amber">{{ tag }}</span>
            </div>

            <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-gray-900 leading-tight tracking-tight mb-6 max-w-3xl">
              {{ post.title }}
            </h1>

            <!-- Meta -->
            <div class="inline-flex items-center flex-wrap gap-5 px-5 py-3 rounded-xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface bg-mist-surface2 text-sm">
              <span class="flex items-center gap-1.5 dark:text-gray-400 text-gray-500">
                <Icon name="mdi:clock-outline" class="dark:text-teal-400 text-teal-600 text-xs" />
                {{ post.readTimeMinutes }} min read
              </span>
              <span class="flex items-center gap-1.5 dark:text-gray-400 text-gray-500">
                <Icon name="mdi:github" class="dark:text-teal-400 text-teal-600 text-xs" />
                {{ post.seriesLabel }}
              </span>
              <span class="flex items-center gap-1.5 dark:text-gray-400 text-gray-500">
                <Icon name="gridicons:menus" class="dark:text-teal-400 text-teal-600 text-xs" />
                {{ post.seriesNumber }} of {{ post.seriesType === 'nodejs' ? 14 : 6 }}
              </span>
            </div>
          </header>

          <!-- Layout -->
          <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start pt-10">

            <!-- Article content -->
            <article
              class="series-article flex-1 min-w-0 prose prose-lg dark:prose-dark max-w-none
                prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:border-b prose-h1:dark:border-teal-400/15 prose-h1:border-teal-600/15 prose-h1:pb-3
                prose-h2:text-2xl prose-h2:border-b prose-h2:dark:border-teal-400/10 prose-h2:border-teal-600/10 prose-h2:pb-2
                prose-h3:text-xl prose-h3:dark:text-teal-400 prose-h3:text-teal-600
                prose-p:leading-[1.85] prose-p:dark:text-gray-300 prose-p:text-gray-700
                prose-li:dark:text-gray-300 prose-li:text-gray-700
                prose-pre:rounded-xl prose-pre:text-sm prose-pre:leading-relaxed
                prose-img:rounded-xl prose-img:border prose-img:dark:border-teal-400/15 prose-img:border-teal-600/15
                article-body"
              v-html="post.htmlContent"
            ></article>

            <!-- TOC sidebar -->
            <nav v-if="toc.length" class="toc w-56 flex-shrink-0 sticky top-24 overflow-auto rounded-2xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface bg-white p-5" style="max-height:calc(100vh - 120px);">
              <p class="font-mono text-xs font-semibold uppercase tracking-widest dark:text-teal-400 text-teal-600 mb-4 flex items-center gap-2">
                <Icon name="mdi:format-list-bulleted" class="text-sm" />
                Contents
              </p>
              <ul class="space-y-0.5">
                <li v-for="item in toc" :key="item.id" :class="item.level >= 3 ? 'pl-4' : ''">
                  <a
                    :href="'#' + item.id"
                    @click.prevent="scrollTo(item.id)"
                    :class="[
                      'block py-1.5 px-2.5 rounded-lg border-l-2 text-sm leading-snug transition-all duration-200 no-underline',
                      activeTocId === item.id
                        ? 'dark:text-teal-400 text-teal-600 dark:bg-teal-400/10 bg-teal-600/8 border-teal-400 dark:border-teal-400 font-medium'
                        : 'dark:text-gray-400 text-gray-500 border-transparent hover:dark:text-teal-400 hover:text-teal-600 hover:dark:bg-teal-400/6'
                    ]"
                  >{{ item.text }}</a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Post navigation -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 pt-8 border-t dark:border-teal-400/10 border-teal-600/10">
            <NuxtLink
              v-if="adjacent.prev"
              :to="`/series/${adjacent.prev.slug}`"
              class="group block rounded-xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:dark:border-teal-400/40 hover:border-teal-600/40"
            >
              <div class="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-2">
                <Icon name="mdi:chevron-left" /> Previous
              </div>
              <p class="font-heading font-semibold dark:text-white text-gray-900 text-sm leading-snug group-hover:dark:text-teal-400 group-hover:text-teal-600 transition-colors line-clamp-2">
                {{ adjacent.prev.title }}
              </p>
            </NuxtLink>
            <div v-else></div>
            <NuxtLink
              v-if="adjacent.next"
              :to="`/series/${adjacent.next.slug}`"
              class="group block rounded-xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface bg-white p-5 no-underline text-right transition-all duration-200 hover:-translate-y-0.5 hover:dark:border-teal-400/40 hover:border-teal-600/40 sm:col-start-2"
            >
              <div class="flex items-center justify-end gap-1.5 text-xs font-mono uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-2">
                Next <Icon name="mdi:chevron-right" />
              </div>
              <p class="font-heading font-semibold dark:text-white text-gray-900 text-sm leading-snug group-hover:dark:text-teal-400 group-hover:text-teal-600 transition-colors line-clamp-2">
                {{ adjacent.next.title }}
              </p>
            </NuxtLink>
          </div>

          <div class="mt-6 text-center">
            <NuxtLink to="/series" class="dark:text-teal-400 text-teal-600 text-sm inline-flex items-center gap-1.5 no-underline hover:underline">
              <Icon name="mdi:arrow-left" /> Back to all series
            </NuxtLink>
          </div>

        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Copy button on code blocks */
:deep(.copy-code-btn) {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 12px;
  background: rgba(45,212,191,0.1);
  border: 1px solid rgba(45,212,191,0.25);
  border-radius: 6px;
  color: #2dd4bf;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
}
:deep(.copy-code-btn:hover) {
  background: rgba(45,212,191,0.2);
}
:deep(pre[data-lang]::after) {
  content: attr(data-lang);
  position: absolute;
  top: 10px;
  right: 56px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.6;
}
</style>
