import { LoaderFunction, redirect } from "@remix-run/node";
import type { HTMLFunctionSerializer } from "@prismicio/helpers";
import { asHTML } from "@prismicio/helpers";
import { client } from "~/modules/prismic/client";
import type { BlogPostDocument } from "types.generated";
import { useLoaderData } from "@remix-run/react";
import { Title } from "~/components/Title";
import hljs from "highlight.js";
import { useEffect } from "react";

interface LoaderData {
  pageData: BlogPostDocument<string>;
  html: string;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  try {
    const pageData = await client.getByUID("blog_post", params.id!);

    const htmlSerializer: HTMLFunctionSerializer = (
      type,
      element,
      text,
      children
    ) => {
      if (type === "preformatted") {
        const className =
          children[0] === "$" ? "hljs language-shell" : "hljs language-ts";

        return `<pre><code class="${className}">${children}</code></pre>`;
      }

      return null;
    };

    const html = asHTML(pageData.data.content, null, htmlSerializer);
    pageData.data.content = [];

    return {
      pageData,
      html,
    };
  } catch {
    throw redirect("/404");
  }
};

export default function BlogPost() {
  const { pageData, html } = useLoaderData<LoaderData>();

  useEffect(() => {
    hljs.addPlugin({
      "before:highlightElement": ({ el }) => {
        el.textContent = el.innerText;
      },
    });
    hljs.highlightAll();
  }, []);

  const imgUrl = pageData.data.cover?.url;

  return (
    <div>
      <Title value={pageData.data.title} />

      {imgUrl && (
        <img
          src={imgUrl}
          alt={pageData.data.title[0]?.text}
          className="mt-0 object-cover"
          height="400px"
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
