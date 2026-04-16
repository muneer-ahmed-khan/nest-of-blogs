import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const {
    firebaseApiKey,
    firebaseAuthDomain,
    firebaseProjectId,
    firebaseStorageBucket,
    firebaseSenderId,
    firebaseAppId,
    firebaseMeasurementId,
  } = useRuntimeConfig().public;

  const app = initializeApp({
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId,
  });

  return {
    provide: {
      auth: getAuth(app),
      provider: new GoogleAuthProvider(),
      db: getFirestore(app),
    },
  };
});
