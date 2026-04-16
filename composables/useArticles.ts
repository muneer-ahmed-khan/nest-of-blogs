import { calculateReadTime, titleToSlug } from "~/utils";

export function useArticles() {
  const articles = ref<any[]>([]);
  const error = ref<any>(null);

  async function fetchArticles(topic?: string, slug?: string) {
    try {
      let fetchedArticles;

      if (topic) {
        fetchedArticles = await queryContent()
          .where({ topic, isPublished: true })
          .find();
      } else if (slug) {
        // Content files use BL-XXXX names, but URLs are derived from titles.
        // Match by the slug computed from each article's title.
        const all = await queryContent().find();
        fetchedArticles = all.filter(
          (a: any) => titleToSlug(a.title ?? "") === slug
        );
      } else {
        fetchedArticles = await queryContent()
          .where({ isPublished: true })
          .find();
      }

      articles.value = fetchedArticles.map(({ body, ...article }) => ({
        ...article,
        readingTime: calculateReadTime(body),
        body,
      }));
    } catch (err) {
      error.value = err;
    }
  }

  return { articles, error, fetchArticles };
}
