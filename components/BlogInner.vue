<script lang="ts" setup>
const { article } = defineProps({
  article: {
    type: Object,
    default: [],
  },
});

// Tags as an array
const tags = computed(() => article?.tags?.split(" ") || []);
</script>

<template>
  <div class="mx-auto flex justify-center max-w-screen-xl px-6">
    <!-- Blog Content -->
    <div class="rounded-lg shadow-lg bg-white dark:bg-gray-900 pb-8">
      <!-- Header Image -->
      <img
        class="object-cover w-full h-72"
        :src="article?.headerImage"
        alt="Article Image"
      />

      <div class="p-4">
        <div class="flex flex-col items-center">
          <!-- Tags -->
          <div class="flex justify-around">
            <p
              v-for="tag in tags"
              :key="tag"
              class="inline-block px-3 ml-3 py-1 mb-4 text-xs font-semibold tracking-wider text-gray-50 uppercase rounded-full bg-indigo-500 dark:bg-indigo-600"
            >
              {{ tag }}
            </p>
          </div>

          <!-- Title -->
          <a
            class="block mt-2 text-2xl sm:text-4xl font-semibold text-gray-800 dark:text-gray-100"
          >
            {{ article?.title }}
          </a>

          <!-- Separator -->
          <p class="text-5xl pt-2">
            <Icon name="bi:three-dots" class="dark:text-white" />
          </p>

          <!-- Blog Content -->
          <article
            class="prose max-w-xs sm:max-w-sm md:max-w-prose lg:prose-lg py-7 dark:prose-dark"
          >
            <ContentRenderer :value="article">
              <ContentRendererMarkdown :value="article" />
            </ContentRenderer>
          </article>

          <!-- Author Info -->
          <div class="mt-3">
            <div class="flex items-center flex-col">
              <p class="text-5xl pb-2">
                <Icon name="bi:three-dots" class="dark:text-white" />
              </p>
              <p class="text-2xl pb-2 dark:text-white">Thanks for reading!!!</p>
              <p class="mx-2 font-semibold text-gray-700 dark:text-gray-100">
                {{ article?.author }}
              </p>
              <p
                class="text-sm font-medium leading-4 text-gray-600 dark:text-gray-200"
              >
                Author
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table of Contents -->
    <div class="toc ml-auto max-w-sm">
      <TableOfContent :toc="article.body?.toc" />
    </div>
  </div>
</template>
