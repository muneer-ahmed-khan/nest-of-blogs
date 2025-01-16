<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

// Generate the LinkedIn share URL dynamically based on the data props
const linkedinShareUrl = computed(
  () =>
    `https://www.linkedin.com/shareArticle?mini=true&url=nest-of-blogs.vercel.app/blogs/${props.article.title
      .split(" ")
      .join("-")
      .toLowerCase()}&title=${encodeURIComponent(props.article.title)}`
);
</script>

<template>
  <div class="text-center pb-4">
    <button
      class="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center space-x-2 rounded"
    >
      <Icon name="mdi:linkedin" style="width: 32px; height: 32px" />
      <a
        class="linkedin-share-button"
        rel="noopener noreferrer"
        target="_blank"
        :href="linkedinShareUrl"
      >
        Share on LinkedIn
      </a>
    </button>
  </div>
</template>

<style scoped>
.linkedin-share-button {
  text-decoration: none;
}
</style>
