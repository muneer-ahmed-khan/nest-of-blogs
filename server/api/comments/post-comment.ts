// ~/server/api/post-comment.ts
import { defineEventHandler, readBody } from "h3";
import db from "~/server/services/firebase-admin";

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    return { status: 405, message: "Invalid Request Method" };
  }

  try {
    // Parse request body
    const { postId, userName, userImage, comment, userId } = await readBody<{
      postId: string;
      userName: string;
      userImage: string;
      comment: string;
      userId: string;
    }>(event);

    if (!postId || !userName || !userImage || !comment || !userId) {
      return { status: 400, message: "All fields are required." };
    }

    // Add comment to Firestore
    const docData = {
      userName,
      userImage,
      comment,
      date: Date.now(),
      userId,
    };

    const decRef = db.collection("posts").doc(postId).collection("comments");
    await decRef.add(docData);

    return { status: 200, message: "Comment posted successfully." };
  } catch (error) {
    console.error("Error posting comment:", error);
    return { status: 500, message: "Failed to post comment." };
  }
});
