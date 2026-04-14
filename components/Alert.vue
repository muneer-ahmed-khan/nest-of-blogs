<script setup lang="ts">
const props = defineProps<{ show: boolean; type: string; message: string }>()
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="show"
      class="fixed bottom-8 inset-x-0 mx-auto z-[9999] flex justify-center px-4"
    >
      <div
        :class="[
          'inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium shadow-lg backdrop-blur-xl border',
          type === 'success'
            ? 'dark:bg-ocean-surface/90 bg-white/90 dark:border-teal-400/30 border-teal-600/30 dark:text-teal-400 text-teal-600'
            : 'dark:bg-ocean-surface/90 bg-white/90 dark:border-red-400/30 border-red-500/30 dark:text-red-400 text-red-600'
        ]"
      >
        <Icon
          :name="type === 'success' ? 'mdi:check-circle-outline' : 'mdi:alert-circle-outline'"
          class="text-lg flex-shrink-0"
        />
        <span>{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
.slide-up-enter-from { opacity: 0; transform: translateY(16px); }
.slide-up-leave-to   { opacity: 0; transform: translateY(16px); }
</style>
