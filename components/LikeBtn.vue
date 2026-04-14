<script setup lang="ts">
const props = defineProps({ id: String })

const loading = ref(false)
const { data, refresh } = await useFetch(`/api/likes/${props.id}`)

const handleClick = async () => {
  loading.value = true
  const response = await $fetch('/api/likes/like-blog', {
    method: 'POST',
    body: JSON.stringify({ id: props.id }),
    headers: { 'Content-Type': 'application/json' },
  })
  if ((response as any).status === 200) { await refresh() }
  loading.value = false
}

const hasLiked    = computed(() => data.value && 'hasUserLiked' in data.value && (data.value as any).hasUserLiked)
const totalLikes  = computed(() => data.value && 'totalLikes'   in data.value ? (data.value as any).totalLikes : 0)
</script>

<template>
  <div class="flex justify-center items-center pt-12 pb-4">
    <button
      @click="handleClick"
      :disabled="loading"
      :class="[
        'group inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl border transition-all duration-200 font-semibold text-sm',
        hasLiked
          ? 'dark:bg-red-500/15 bg-red-50 dark:border-red-400/40 border-red-300 dark:text-red-400 text-red-500'
          : 'dark:border-teal-400/25 border-teal-600/25 dark:text-gray-400 text-gray-500 hover:dark:bg-teal-400/8 hover:bg-teal-600/6 hover:dark:text-teal-400 hover:text-teal-600 hover:dark:border-teal-400/50 hover:border-teal-600/40'
      ]"
    >
      <Icon
        v-if="loading"
        name="line-md:loading-twotone-loop"
        class="text-lg animate-spin"
      />
      <Icon
        v-else
        :name="hasLiked ? 'mdi:heart' : 'mdi:heart-outline'"
        class="text-lg transition-transform duration-200 group-hover:scale-110"
        :class="hasLiked ? 'text-red-400' : ''"
      />
      <span>{{ totalLikes }} {{ totalLikes === 1 ? 'like' : 'likes' }}</span>
    </button>
  </div>
</template>
