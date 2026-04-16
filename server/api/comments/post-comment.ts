import db from "~/server/services/firebase-admin";

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== "POST") {
    return { status: 405, message: "Method not allowed." };
  }

  try {
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

    await db.collection("posts").doc(postId).collection("comments").add({
      userName,
      userImage,
      comment,
      userId,
      date: Date.now(),
    });

    return { status: 200, message: "Comment posted successfully." };
  } catch {
    return { status: 500, message: "Failed to post comment." };
  }
});
