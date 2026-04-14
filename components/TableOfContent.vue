<script lang="ts" setup>
defineProps<{ toc: any }>();

const active = ref<string>("");

// Track active heading on scroll
function onScroll() {
  const headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id]");
  for (let i = headings.length - 1; i >= 0; i--) {
    const rect = headings[i].getBoundingClientRect();
    if (rect.top <= 112) {
      active.value = headings[i].id;
      return;
    }
  }
  active.value = "";
}

onMounted(()  => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <nav
    v-if="toc?.links?.length"
    class="sticky top-24 overflow-auto toc-inner rounded-2xl border dark:border-teal-400/15 border-teal-600/15 dark:bg-ocean-surface bg-white p-5"
  >
    <!-- Title -->
    <p class="font-mono text-xs font-semibold uppercase tracking-widest dark:text-teal-400 text-teal-600 mb-4 flex items-center gap-2">
      <Icon name="mdi:format-list-bulleted" class="text-sm" />
      On this page
    </p>

    <ul class="space-y-0.5">
      <li
        v-for="heading in toc.links"
        :key="heading.id"
        :class="['text-sm leading-snug', heading.depth === 3 ? 'pl-4' : '']"
      >
        <NuxtLink
          :to="`#${heading.id}`"
          :class="[
            'block py-1.5 px-2.5 rounded-lg border-l-2 transition-all duration-200 no-underline',
            heading.id === active
              ? 'dark:text-teal-400 text-teal-600 dark:bg-teal-400/10 bg-teal-600/8 border-teal-400 dark:border-teal-400 font-medium'
              : 'dark:text-gray-400 text-gray-500 border-transparent hover:dark:text-teal-400 hover:text-teal-600 hover:dark:bg-teal-400/6 hover:bg-teal-600/6'
          ]"
          @click="active = heading.id"
        >{{ heading.text }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
