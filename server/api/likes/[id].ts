import db from "~/server/services/firebase-admin";
import requestIp from "request-ip";
import { createHash } from "crypto";

const hashIp = (ip: string) => createHash("sha256").update(ip).digest("hex");

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Post ID is required." });
  }

  const clientIp = requestIp.getClientIp(event.node.req);

  if (!clientIp) {
    throw createError({ statusCode: 500, statusMessage: "Unable to determine client IP." });
  }

  const likeRef = db.collection("posts").doc(id).collection("likes");

  try {
    const snapshot = await likeRef.get();

    if (snapshot.empty) {
      return { hasUserLiked: false, totalLikes: 0 };
    }

    const hashedIp = hashIp(clientIp);
    let hasUserLiked = false;
    let totalLikes = 0;

    snapshot.forEach((doc) => {
      if (doc.data().userIp === hashedIp) hasUserLiked = true;
      totalLikes++;
    });

    return { hasUserLiked, totalLikes };
  } catch {
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch likes." });
  }
});
