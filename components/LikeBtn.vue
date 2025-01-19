<script setup lang="ts">
const props = defineProps({
  id: String,
});

const loading = ref(false);
const { data, refresh } = await useFetch(`/api/likes/${props.id}`);

const handleClick = async () => {
  loading.value = true;

  const response = await $fetch("/api/likes/like-blog", {
    method: "POST",
    body: JSON.stringify({ id: props.id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if ((response as any).status === 200) {
    await refresh();
    loading.value = false;
  } else {
    loading.value = false;
  }
};
</script>

<template>
  <div class="justify-center pt-16 pb-6 flex flex-row items-center">
    <Icon
      v-if="loading"
      name="line-md:loading-twotone-loop"
      class="animate-spin dark:text-white"
      style="font-size: 1.5rem"
    />
    <div v-else class="flex items-center justify-center">
      <button @click="handleClick" :disabled="loading">
        <Icon
          v-if="data && 'hasUserLiked' in data && data.hasUserLiked"
          name="mdi:heart"
          class="text-4xl text-red-600"
        />
        <Icon
          v-else
          name="mdi:heart-outline"
          class="dark:text-white text-4xl"
        />
      </button>
      <span
        class="dark:text-white text-2xl pl-1 pb-1"
        v-if="data && 'totalLikes' in data"
      >
        {{ data?.totalLikes }}
      </span>
    </div>
  </div>
</template>
