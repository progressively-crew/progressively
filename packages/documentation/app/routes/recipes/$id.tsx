import { LoaderFunction, redirect } from "@remix-run/node";
import type { HTMLFunctionSerializer } from "@prismicio/helpers";
import { asHTML } from "@prismicio/helpers";
import { client } from "~/modules/prismic/client";
import type { RecipePostDocument } from "types.generated";
import { useLoaderData } from "@remix-run/react";
import { Title } from "~/components/Title";
import hljs from "highlight.js";
import { useEffect } from "react";

interface LoaderData {
  pageData: RecipePostDocument<string>;
  html: string;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  try {
    const pageData = await client.getByUID("recipe_post", params.id!);

    const htmlSerializer: HTMLFunctionSerializer = (
      type,
      element,
      text,
      children
    ) => {
      if (type === "preformatted")
        return `<pre><code class="hljs language-js">${children}</code></pre>`;
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

export default function RecipePost() {
  const { pageData, html } = useLoaderData<LoaderData>();

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="py-4 md:py-12 px-4 md:px-0">
      <div className="flex flex-row gap-8">
        <nav className="px-8">
          <ul>
            {pageData.data.ingredients.map((ing) => (
              <li key={ing.name[0]?.text}>{ing.name[0]?.text}</li>
            ))}
          </ul>
        </nav>
        <main className="prose lg:prose-x mx-auto">
          <div>
            <Title value={pageData.data.title} />
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </main>
      </div>
    </div>
  );
}
