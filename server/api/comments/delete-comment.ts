import db from "~/server/services/firebase-admin";

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== "DELETE") {
    return { status: 405, message: "Method not allowed." };
  }

  try {
    const { postId, commentId } = await readBody<{
      postId: string;
      commentId: string;
    }>(event);

    if (!postId || !commentId) {
      return { status: 400, message: "Post ID and Comment ID are required." };
    }

    const commentRef = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId);

    await commentRef.delete();

    return { status: 200, message: "Comment deleted successfully." };
  } catch {
    return { status: 500, message: "Internal server error." };
  }
});
