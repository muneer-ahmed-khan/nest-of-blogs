import db from "~/server/services/firebase-admin";

export default defineEventHandler(async (event) => {
  try {
    const { pid } = event.context.params as { pid: string };

    if (!pid) {
      return { statusCode: 400, body: { error: "Post ID is required." } };
    }

    const snapshot = await db
      .collection("posts")
      .doc(pid)
      .collection("comments")
      .orderBy("date", "desc")
      .get();

    const comments = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id:        doc.id,
        comment:   data.comment,
        userName:  data.userName,
        userImage: data.userImage,
        userId:    data.userId,
        date:      new Date(data.date)
          .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
          .replace(",", ""),
      };
    });

    return { statusCode: 200, body: { comments } };
  } catch {
    return { statusCode: 500, body: { error: "Failed to fetch comments." } };
  }
});
