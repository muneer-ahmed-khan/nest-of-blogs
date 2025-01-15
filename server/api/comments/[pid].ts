import db from "~/server/services/firebase-admin";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const { pid } = event.context.params as any;

    // Validate the presence of the Post ID
    if (!pid) {
      return {
        statusCode: 400,
        body: { error: "Post ID is required" },
      };
    }

    // Reference the comments collection for the specified post
    const commentsRef = db.collection("posts").doc(pid).collection("comments");
    const snapshot = await commentsRef.orderBy("date", "desc").get();

    // Transform the snapshot data into a structured array of comments
    const comments = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        comment: data.comment,
        userName: data.userName,
        userImage: data.userImage,
        date: new Date(data.date)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
          .replace(",", ""),
        userId: data.userId,
      };
    });

    // Return the fetched comments
    return {
      statusCode: 200,
      body: { comments },
    };
  } catch (error) {
    // Handle errors during the fetching process
    return {
      statusCode: 500,
      body: { error: "Failed to fetch comments" },
    };
  }
});
