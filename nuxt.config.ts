export default defineNuxtConfig({
  compatibilityDate: "2024-12-28",

  devtools: { enabled: false },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  nitro: {
    preset: "github-pages",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/content",
  ],

  // Public vars are auto-read from NUXT_PUBLIC_* env vars at runtime.
  // Private vars use explicit process.env reads so the existing .env naming
  // (FIREBASE_CLIENT_EMAIL etc.) works without renaming. They can still be
  // overridden at runtime via NUXT_FIREBASE_* if needed.
  runtimeConfig: {
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? "",
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY ?? "",
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID ?? "",
    public: {
      firebaseApiKey: "",
      firebaseAuthDomain: "",
      firebaseProjectId: "",
      firebaseStorageBucket: "",
      firebaseSenderId: "",
      firebaseAppId: "",
      firebaseMeasurementId: "",
    },
  },

  content: {
    markdown: {
      anchorLinks: false,
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: { level: 2 },
    viewer: true,
    editorSupport: true,
  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
});
