import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const {
    NUXT_PUBLIC_FIREBASE_API_KEY,
    NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NUXT_PUBLIC_FIREBASE_PROJECT_ID,
    NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NUXT_PUBLIC_FIREBASE_SENDER_ID,
    NUXT_PUBLIC_FIREBASE_APP_ID,
    NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  } = useRuntimeConfig().public;

  const firebaseConfig = {
    apiKey: NUXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: NUXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: NUXT_PUBLIC_FIREBASE_SENDER_ID,
    appId: NUXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Provide Firebase instances globally
  return {
    provide: {
      auth,
      provider,
      db,
    },
  };
});
