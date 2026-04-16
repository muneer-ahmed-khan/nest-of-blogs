export const titleToSlug = (title: string): string =>
  title.replace(/[^\w\s-]/g, "").trim().split(/\s+/).join("-").toLowerCase();

export const calculateReadTime = (body: any): string => {
  const wordsPerMinute = 190;
  let wordCount = 0;

  function extractText(node: any) {
    if (node?.type === "text") {
      wordCount += node.value.split(/\s+/).filter(Boolean).length;
    } else if (node?.children) {
      node.children.forEach(extractText);
    }
  }

  body?.children?.forEach(extractText);

  return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
};
