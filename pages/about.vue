<script setup lang="ts">
useSeoMeta({
  title: "About Muneer — Developer & Technologist",
  description: "Passionate developer focused on web technologies, backend systems, and innovative solutions.",
  ogTitle: "About Muneer — Developer & Technologist",
  ogDescription: "Passionate developer focused on web technologies, backend systems, and innovative solutions.",
  ogImage: "https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public/about-seo.png",
  ogUrl: "https://muneer-ahmed.vercel.app/about",
  twitterTitle: "About Muneer — Developer & Technologist",
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

useHead({
  link: [
    { rel: "canonical", href: "https://muneer-ahmed.vercel.app/about" },
    { rel: "icon", type: "image/png", href: "/favicon.png" },
  ],
  htmlAttrs: { lang: "en" },
});
</script>

<template>
  <div class="pt-28 pb-32 px-6 mx-auto max-w-3xl">

    <!-- Hero -->
    <div class="text-center mb-16">
      <div class="flex justify-center mb-8">
        <div class="relative">
          <img src="/about.png" class="h-32 w-32 rounded-2xl object-cover" alt="About Muneer" />
          <span class="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 dark:border-ocean-bg border-mist-bg" style="background:#27c93f;"></span>
        </div>
      </div>

      <div class="inline-flex items-center gap-2 mb-4 animate-fade-up">
        <span class="w-2 h-2 rounded-full animate-pulse" style="background:#2dd4bf;"></span>
        <span class="font-mono text-xs font-semibold tracking-widest uppercase dark:text-teal-400 text-teal-600">
          About Me
        </span>
      </div>

      <h1 class="font-heading text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-5 leading-tight animate-fade-up-2">
        Hi, I'm
        <span
          class="bg-clip-text text-transparent"
          style="background-image: linear-gradient(135deg, #2dd4bf, #fbbf24);"
        > Muneer</span>.
      </h1>

      <p class="dark:text-gray-400 text-gray-600 leading-relaxed text-lg max-w-2xl mx-auto animate-fade-up-3">
        A passionate developer committed to continuously enhancing expertise in web technologies and backend systems.
        Building innovative, scalable, and efficient systems that solve real-world problems.
      </p>

      <div class="flex justify-center gap-3 pt-8 flex-wrap animate-fade-up-3">
        <a
          href="https://muneer-ahmed.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-ocean no-underline"
        >
          <Icon name="fa:laptop" />
          See My Works
        </a>
        <a
          href="https://www.linkedin.com/in/muneer-ahmed-a59362140/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 no-underline border dark:border-teal-400/30 border-teal-600/30 dark:text-teal-400 text-teal-600 hover:dark:bg-teal-400/10 hover:bg-teal-600/8"
        >
          <Icon name="mdi:linkedin" />
          LinkedIn
        </a>
        <a
          href="https://github.com/muneer-ahmed-khan"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 no-underline border dark:border-teal-400/20 border-teal-600/20 dark:text-gray-400 text-gray-600 hover:dark:bg-teal-400/8 hover:bg-teal-600/6"
        >
          <Icon name="mdi:github" />
          GitHub
        </a>
      </div>
    </div>

    <!-- Stack -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="font-heading text-lg font-semibold dark:text-white text-gray-900 flex items-center gap-2">
          <Icon name="bx:terminal" class="dark:text-teal-400 text-teal-600" />
          Tech Stack
        </h2>
        <div class="flex-1 h-px dark:bg-teal-400/15 bg-teal-600/15"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="category in [
            { label: 'Backend', icon: 'mdi:server', color: 'teal', items: ['Node.js', 'NestJS', 'Express', 'Python', 'FastAPI'] },
            { label: 'Frontend', icon: 'mdi:monitor-dashboard', color: 'amber', items: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'] },
            { label: 'Databases', icon: 'mdi:database', color: 'teal', items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'] },
            { label: 'Tools & Cloud', icon: 'mdi:cloud-outline', color: 'amber', items: ['Docker', 'Git', 'Vercel', 'LLMs / AI'] },
          ]"
          :key="category.label"
          class="rounded-2xl border dark:border-teal-400/12 border-teal-600/12 dark:bg-ocean-surface/60 bg-white/80 p-5"
        >
          <div class="flex items-center gap-2 mb-3">
            <Icon :name="category.icon" :class="category.color === 'teal' ? 'dark:text-teal-400 text-teal-600' : 'text-amber-400 dark:text-amber-400 text-amber-600'" />
            <span class="font-semibold text-sm dark:text-white text-gray-900">{{ category.label }}</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in category.items"
              :key="item"
              :class="category.color === 'teal' ? 'tag-pill-teal' : 'tag-pill-amber'"
            >{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog series plug -->
    <div
      class="rounded-2xl border dark:border-teal-400/15 border-teal-600/15 p-6 text-center relative overflow-hidden"
      style="background: linear-gradient(135deg, rgba(45,212,191,0.06), rgba(251,191,36,0.03));"
    >
      <div class="absolute top-0 left-0 right-0 h-0.5" style="background: linear-gradient(90deg,#2dd4bf,#fbbf24);"></div>
      <Icon name="mdi:github" class="text-4xl dark:text-teal-400 text-teal-600 mb-3 opacity-60" />
      <h3 class="font-heading font-bold dark:text-white text-gray-900 mb-2">20 Articles on GitHub Series</h3>
      <p class="text-sm dark:text-gray-400 text-gray-500 mb-5">
        Deep-dive articles on TypeScript, Node.js, and Express — fetched live from GitHub.
      </p>
      <NuxtLink to="/series" class="btn-ocean no-underline">
        <Icon name="mdi:book-open-outline" />
        Read the Series
      </NuxtLink>
    </div>

  </div>
</template>
