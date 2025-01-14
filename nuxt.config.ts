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

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_FIREBASE_API_KEY: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
        process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NUXT_PUBLIC_FIREBASE_PROJECT_ID:
        process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
        process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      NUXT_PUBLIC_FIREBASE_SENDER_ID:
        process.env.NUXT_PUBLIC_FIREBASE_SENDER_ID,
      NUXT_PUBLIC_FIREBASE_APP_ID: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
        process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  },

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
