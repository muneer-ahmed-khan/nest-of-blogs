// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-12-28",

  devtools: { enabled: false },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/content",
  ],

  content: {
    markdown: {
      anchorLinks: false,
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
    editorSupport: true,
  },

  css: ["~/assets/css/tailwind.css"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
});
