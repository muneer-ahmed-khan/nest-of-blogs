import db from "~/server/services/firebase-admin";
import requestIp from "request-ip";
import { createHash } from "crypto";

const hashIp = (ip: any) => createHash("sha256").update(ip).digest("hex");

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as any;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Post ID is required.",
    });
  }

  let hasUserLiked = false,
    totalLikes = 0;

  const clientIp = requestIp.getClientIp(event.node.req) || "unknown";

  if (clientIp === "unknown") {
    throw createError({
      statusCode: 500,
      statusMessage: "Unable to determine client IP address.",
    });
  }

  const likeRef = db.collection("posts").doc(id).collection("likes");

  try {
    const snapshot = await likeRef.get();

    if (snapshot.empty) {
      console.log("No likes found for this post.");
      return { hasUserLiked, totalLikes };
    }

    snapshot.forEach((doc) => {
      if (hashIp(clientIp) === doc.data().userIp) {
        hasUserLiked = true;
      }
      totalLikes++;
    });

    return { hasUserLiked, totalLikes };
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch likes.",
    });
  }
});
