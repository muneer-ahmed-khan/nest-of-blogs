<script setup lang="ts">
const year = new Date().getFullYear();
const articles = await queryContent().find();
const topics = [...new Set(articles.map((a: any) => a.topic).filter(Boolean))];
</script>

<template>
  <footer class="mt-16 border-t dark:border-teal-400/10 border-teal-600/10 dark:bg-ocean-bg bg-mist-bg">
    <div class="container mx-auto px-6 py-10">

      <!-- Top row -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">

        <!-- Brand + tagline -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span class="font-heading font-bold dark:text-white text-gray-900">
              muneer<span class="text-teal-600 dark:text-teal-400">.</span>dev
            </span>
          </div>
          <p class="text-xs dark:text-gray-500 text-gray-400 max-w-xs leading-relaxed">
            Built by a developer, written for developers.
          </p>
        </div>

        <!-- Nav links -->
        <div class="flex flex-col sm:flex-row gap-8">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest dark:text-gray-600 text-gray-400 mb-3">Navigate</p>
            <nav class="flex flex-col gap-2 text-sm">
              <NuxtLink to="/" class="dark:text-gray-400 text-gray-500 hover:dark:text-teal-400 hover:text-teal-600 transition-colors no-underline">Latest</NuxtLink>
              <NuxtLink to="/series" class="dark:text-gray-400 text-gray-500 hover:dark:text-teal-400 hover:text-teal-600 transition-colors no-underline">Series</NuxtLink>
              <NuxtLink to="/about" class="dark:text-gray-400 text-gray-500 hover:dark:text-teal-400 hover:text-teal-600 transition-colors no-underline">About</NuxtLink>
              <a
                href="https://muneer-ahmed.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 dark:text-gray-400 text-gray-500 hover:dark:text-teal-400 hover:text-teal-600 transition-colors no-underline"
              >Portfolio <Icon name="mdi:arrow-top-right" class="text-xs opacity-50" /></a>
            </nav>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest dark:text-gray-600 text-gray-400 mb-3">Topics</p>
            <nav class="flex flex-col gap-2 text-sm">
              <NuxtLink
                v-for="topic in topics"
                :key="topic"
                :to="`/topic/${topic}`"
                class="dark:text-gray-400 text-gray-500 hover:dark:text-teal-400 hover:text-teal-600 transition-colors no-underline"
              >{{ topic }}</NuxtLink>
            </nav>
          </div>
        </div>

        <!-- Social icons -->
        <div class="flex items-center gap-3">
          <a
            v-for="(link, i) in [
              { href: 'https://github.com/muneer-ahmed-khan',                    icon: 'mdi:github',        label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/muneer-ahmed-a59362140/',     icon: 'mdi:linkedin',      label: 'LinkedIn' },
              { href: 'https://stackoverflow.com/users/8422060/muneer-khan',     icon: 'mdi:stack-overflow',label: 'Stack Overflow' },
            ]"
            :key="i"
            :href="link.href"
            :title="link.label"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 flex items-center justify-center rounded-xl border dark:border-teal-400/20 border-teal-600/20 dark:text-gray-400 text-gray-500 hover:dark:text-teal-400 hover:text-teal-600 dark:hover:bg-teal-400/10 hover:bg-teal-600/8 transition-all duration-200 no-underline"
          >
            <Icon :name="link.icon" class="text-base" />
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px dark:bg-teal-400/10 bg-teal-600/10 mb-6"></div>

      <!-- Bottom row -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs dark:text-gray-600 text-gray-400">
        <span>© {{ year }} Muneer Ahmed. All rights reserved.</span>
        <span class="flex items-center gap-1.5">
          Built with
          <Icon name="mdi:vuejs" class="dark:text-teal-400 text-teal-600 text-sm" />
          Nuxt & Tailwind CSS
        </span>
      </div>
    </div>
  </footer>
</template>
