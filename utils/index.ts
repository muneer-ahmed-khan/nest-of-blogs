export const calculateReadTime = (body: any): string => {
  const wordsPerMinute = 190;
  let wordCount = 0;

  function extractText(node: any) {
    if (node.type === "text") {
      wordCount += node.value.split(/\s+/).filter(Boolean).length;
    } else if (node.children) {
      node.children.forEach((child: any) => extractText(child));
    }
  }

  extractText(body);

  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};
