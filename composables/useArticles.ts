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
        // Content files use BL-XXXX names but URLs are derived from titles.
        // Filter by matching the title-derived slug to find the right article.
        const all = await queryContent().find();
        fetchedArticles = all.filter((a: any) => {
          const derived = a.title?.split(" ").join("-").toLowerCase();
          return derived === slug;
        });
      } else {
        fetchedArticles = await queryContent()
          .where({ isPublished: true })
          .find();
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
