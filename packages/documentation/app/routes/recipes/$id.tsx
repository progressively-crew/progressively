import { LoaderFunction, redirect } from "@remix-run/node";
import type { HTMLFunctionSerializer } from "@prismicio/helpers";
import { asHTML } from "@prismicio/helpers";
import { GiCook } from "react-icons/gi";
import { client } from "~/modules/prismic/client";
import type { RecipePostDocument } from "types.generated";
import { useLoaderData } from "@remix-run/react";
import { Title } from "~/components/Title";
import hljs from "highlight.js";
import { useEffect } from "react";
import { Background } from "~/components/Background";
import { CardContent, SimpleCard } from "~/components/SimpleCard";

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

  const imgUrl = pageData.data.cover?.url;

  return (
    <Background>
      <div className="py-4 md:py-12 max-w-screen-2xl mx-auto px-4 md:px-0">
        <div>
          <div className="inline-block">
            <p className="flex flex-row gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 items-center">
              <GiCook aria-hidden />
              <span>Recipe</span>
            </p>
          </div>

          <Title value={pageData.data.title} />
        </div>

        <div className="grid grid-cols-[300px_1fr] gap-8 items-start pt-8">
          <div className="sticky top-8">
            <SimpleCard>
              <CardContent>
                <aside>
                  <h2 className="font-semibold">Ingredients</h2>
                  <ul className="list-disc list-inside pt-4">
                    {pageData.data.ingredients.map((ing) => (
                      <li key={ing.name[0]?.text} className="text-xs py-1">
                        {ing.name[0]?.text}
                      </li>
                    ))}
                  </ul>
                </aside>
              </CardContent>
            </SimpleCard>

            <div className="h-8" />

            <SimpleCard>
              <CardContent>
                <aside>
                  <h2 className="font-semibold">Directions</h2>
                  <ul className="pt-4">
                    {pageData.data.directions.map((ing) => (
                      <li key={ing.name[0]?.text} className="text-xs py-1">
                        {ing.name[0]?.text}
                      </li>
                    ))}
                  </ul>
                </aside>
              </CardContent>
            </SimpleCard>
          </div>

          <main className="prose lg:prose-x">
            <div>
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt={pageData.data.title[0]?.text}
                  className="mt-0"
                  style={{ height: 264 }}
                />
              )}
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </main>
        </div>
      </div>
    </Background>
  );
}
