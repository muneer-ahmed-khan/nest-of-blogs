export const calculateReadTime = (body: any): string => {
  const wordsPerMinute = 190;
  let wordCount = 0;

  // Helper function to extract text from the body
  function extractText(node: any) {
    if (node?.type === "text") {
      wordCount += node.value.split(/\s+/).filter(Boolean).length;
    } else if (node?.children) {
      node.children.forEach((child: any) => extractText(child)); // Recursively process child nodes
    }
  }

  // Start the extraction process on the root body node
  if (body?.children) {
    body.children.forEach((child: any) => extractText(child)); // Process all root children
  }

  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return `${minutes} min read`;
};
