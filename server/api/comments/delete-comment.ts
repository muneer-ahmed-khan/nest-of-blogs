// server/api/comments/delete-comment.ts
import { defineEventHandler, readBody } from "h3";
import db from "~/server/services/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    if (event.node.req.method !== "DELETE") {
      return { status: 405, message: "Method not allowed" };
    }

    // Read the request body
    const body = await readBody<{ postId: string; commentId: string }>(event);
    const { postId, commentId } = body;

    if (!postId || !commentId) {
      return { status: 400, message: "Post ID and Comment ID are required" };
    }

    // Delete the comment from Firestore
    const decRef = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId);

    await decRef.delete();

    return { status: 200, message: "Comment deleted successfully" };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { status: 500, message: "Internal server error" };
  }
});
