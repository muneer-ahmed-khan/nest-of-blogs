<script lang="ts" setup>
defineProps<{
  toc: any;
}>();

const active = ref<string>("");

const setActive = (headingId: string) => {
  active.value = headingId;
};
</script>

<template>
  <nav class="sticky top-32 overflow-auto toc-inner">
    <ul>
      <li
        v-for="(heading, index) in toc.links"
        :key="heading.uid"
        class="mt-4 text-lg text-gray-700 dark:text-gray-400"
        :style="{
          paddingLeft: heading.level === 3 ? '1rem' : '',
          color: heading.id === active ? '#6366f1' : '',
        }"
        @click="setActive(heading.id)"
      >
        <NuxtLink :to="`#${heading.id}`" class="cursor-pointer !important">{{
          heading.text
        }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc-inner {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
