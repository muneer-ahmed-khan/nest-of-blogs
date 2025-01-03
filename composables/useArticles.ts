import { ref } from "vue";
import { calculateReadTime } from "~/utils";

export function useArticles() {
  const articles = ref<any>([]);
  const error = ref<any>(null);

  async function fetchArticles(topic?: string, slug?: string) {
    try {
      let fetchedArticles;
      if (topic) {
        fetchedArticles = await queryContent()
          .where({ topic, isPublished: true })
          .find();
      } else if (slug) {
        const searchPattern = slug.split("-").join(" ");
        const regex = new RegExp(`^${searchPattern}$`, "i");

        fetchedArticles = await queryContent()
          .where({ title: { $regex: regex } })
          .find();
      } else {
        fetchedArticles = await queryContent().find();
      }

      articles.value = fetchedArticles.map(({ body, ...article }) => {
        return {
          ...article,
          readingTime: calculateReadTime(body),
          body,
        };
      });
    } catch (err) {
      error.value = err;
    }
  }

  return { articles, error, fetchArticles };
}
