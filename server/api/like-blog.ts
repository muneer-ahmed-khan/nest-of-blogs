import db from "~/server/services/firebase-admin";
import requestIp from "request-ip";
import { defineEventHandler, readBody } from "h3";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    // Extract client IP
    const clientIp = requestIp.getClientIp(event.node.req);
    if (!clientIp) {
      return { message: "Failed to retrieve client IP" };
    }

    // Extract post ID from the request body
    const body = await readBody<{ id: string }>(event);
    const pid = body?.id;

    if (!pid) {
      return { status: 400, message: "Post ID is required" };
    }

    const likeRef = db.collection("posts").doc(pid).collection("likes");

    // Fetch existing likes
    const snapshot = await likeRef.get();
    let isFound = false;
    let docId: string | undefined;

    snapshot.forEach((doc) => {
      const hashedClientIp = doc.data().userIp;
      const hash = crypto.createHash("sha256").update(clientIp).digest("hex");

      if (hash === hashedClientIp) {
        isFound = true;
        docId = doc.id;
      }
    });

    // Add or remove like
    if (!isFound) {
      const hash = crypto.createHash("sha256").update(clientIp).digest("hex");
      await likeRef.add({ userIp: hash });
    } else if (docId) {
      await likeRef.doc(docId).delete();
    }

    return { status: 200, message: "Successful" };
  } else {
    return { status: 405, message: "Invalid Request Method" };
  }
});
