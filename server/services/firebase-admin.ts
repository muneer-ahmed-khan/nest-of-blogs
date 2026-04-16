import admin from "firebase-admin";

const { firebaseClientEmail, firebasePrivateKey, firebaseProjectId } =
  useRuntimeConfig();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: firebaseClientEmail,
      privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
      projectId: firebaseProjectId,
    }),
  });
}

export default admin.firestore();
