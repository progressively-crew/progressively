import shiki from "shiki";

export const highlight = async (
  code: string,
  opts = {
    lang: "jsx",
  }
) => {
  const highlighter = await shiki.getHighlighter({
    theme: "github-dark",
    langs: ["jsx"],
  });

  return highlighter.codeToHtml(code, opts);
};
