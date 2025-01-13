<script setup lang="ts">
// Props
const props = defineProps<{
  show: boolean;
  type: string;
  message: string;
}>();

// Computed class based on the type
const alertClass = computed(() =>
  props.type === "success"
    ? "fixed bottom-10 z-50 rounded-lg max-w-sm text-white bg-purple-500 dark:bg-purple-600 font-medium inset-x-0 mx-auto"
    : "fixed bottom-10 z-50 rounded-lg max-w-sm text-white bg-red-500 font-medium inset-x-0 mx-auto"
);
</script>

<template>
  <div v-if="show" :class="alertClass">
    <div class="px-4 py-3 leading-normal flex items-center justify-center">
      <div class="flex justify-center">
        <Icon
          name="mdi:emoticon-happy-outline"
          v-if="type === 'success'"
          class="text-xl mt-0.5"
        />
        <Icon v-else name="mdi:information" class="text-xl mt-0.5" />

        <p class="ml-4 text-center">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
