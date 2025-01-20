<script setup lang="ts">
useSeoMeta({
  title: "About Muneer - Developer and Technologist",
  description:
    "Hi, I’m Muneer. I'm a passionate developer focused on web technologies, backend systems, and innovative solutions. Let's connect!",
  ogTitle: "About Muneer - Developer and Technologist",
  ogDescription:
    "Hi, I’m Muneer. I'm a passionate developer focused on web technologies, backend systems, and innovative solutions. Let's connect!",
  ogImage:
    "https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public/about-seo.png",
  ogUrl: "https://muneer-ahmed.vercel.app/about",
  twitterTitle: "About Muneer - Developer and Technologist",
  twitterDescription:
    "Hi, I’m Muneer. I'm a passionate developer focused on web technologies, backend systems, and innovative solutions. Let's connect!",
  twitterImage:
    "https://raw.githubusercontent.com/muneer-ahmed-khan/nest-of-blogs/master/public/about-seo.png",
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://muneer-ahmed.vercel.app/about",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <div class="max-w-2xl pt-20 pb-32 px-6 text-center mx-auto">
    <div class="h-64 w-full justify-center flex">
      <img src="/about.png" class="h-64" />
    </div>
    <h2 class="text-3xl font-semibold text-gray-700 py-4 dark:text-gray-200">
      Hi,
      <span class="bg-indigo-400 text-white rounded px-1 dark:bg-indigo-500">
        I’m Muneer
      </span>
      . Nice to meet you.
    </h2>
    <p class="text-gray-600 mt-4 dark:text-indigo-200">
      As a passionate developer, I am committed to continuously enhancing my
      expertise in both web technologies and backend systems. I am focused on
      deepening my knowledge in modern frameworks and tools such as Nuxt.js,
      Vue.js, Tailwind CSS, Node.js, NestJS, Python, FastAPI, and large language
      models (LLMs). My goal is to create innovative, scalable, and efficient
      systems that solve real-world problems and drive technological progress.
    </p>

    <div class="text-center pt-8">
      <button
        class="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center space-x-2 rounded dark:bg-indigo-600"
      >
        <Icon name="fa:laptop" />
        <NuxtLink
          rel="noopener noreferrer"
          target="_blank"
          to="https://muneer-ahmed.vercel.app/"
        >
          See My Works
        </NuxtLink>
      </button>

      <button
        class="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center space-x-2 rounded ml-3 dark:bg-indigo-600"
      >
        <Icon name="fa:linkedin-square" />

        <NuxtLink
          class="twitter-follow-button"
          rel="noopener noreferrer"
          target="_blank"
          to="https://www.linkedin.com/in/muneer-ahmed-a59362140/"
        >
          Follow Me
        </NuxtLink>
      </button>
    </div>
  </div>
</template>
