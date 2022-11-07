import React, { useEffect, useState } from "react";
import hljs from "highlight.js"; // import hljs library

interface HighlighterProps {
  content: string;
  language?: string;
}

export function Highlighter({
  content,
  language,
}: HighlighterProps): JSX.Element {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const highlighted = language
      ? hljs.highlight(language, content)
      : hljs.highlightAuto(content);

    setHtml(highlighted.value);
  }, [language, content]);

  return (
    <pre className="hljs">
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}
