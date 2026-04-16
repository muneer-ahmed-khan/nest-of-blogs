import db from "~/server/services/firebase-admin";
import requestIp from "request-ip";
import { createHash } from "crypto";

const hashIp = (ip: string) => createHash("sha256").update(ip).digest("hex");

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    return { status: 405, message: "Method not allowed." };
  }

  const clientIp = requestIp.getClientIp(event.node.req);

  if (!clientIp) {
    return { status: 500, message: "Failed to retrieve client IP." };
  }

  const body = await readBody<{ id: string }>(event);
  const pid = body?.id;

  if (!pid) {
    return { status: 400, message: "Post ID is required." };
  }

  const hashedIp = hashIp(clientIp);
  const likeRef  = db.collection("posts").doc(pid).collection("likes");
  const snapshot = await likeRef.get();

  let existingDocId: string | undefined;

  snapshot.forEach((doc) => {
    if (doc.data().userIp === hashedIp) {
      existingDocId = doc.id;
    }
  });

  if (existingDocId) {
    await likeRef.doc(existingDocId).delete();
  } else {
    await likeRef.add({ userIp: hashedIp });
  }

  return { status: 200, message: "Success." };
});
