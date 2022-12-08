import { LoaderFunction, redirect } from "@remix-run/node";
import type { HTMLFunctionSerializer } from "@prismicio/helpers";
import { asHTML } from "@prismicio/helpers";
import { GiCook } from "react-icons/gi";
import { client } from "~/modules/prismic/client";
import type { RecipePostDocument } from "types.generated";
import { Link, useLoaderData } from "@remix-run/react";
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

    let headerIndex = 0;

    const htmlSerializer: HTMLFunctionSerializer = (
      type,
      element,
      text,
      children
    ) => {
      if (type === "preformatted")
        return `<pre><code class="hljs language-js">${children}</code></pre>`;

      let nextId = "";

      if (type.includes("heading")) {
        nextId = `heading-${headerIndex}`;
        headerIndex += 1;
      }

      if (type === "heading2") return `<h2 id="${nextId}">${children}</h2>`;
      if (type === "heading3") return `<h3 id="${nextId}">${children}</h3>`;
      if (type === "heading4") return `<h4 id="${nextId}">${children}</h4>`;
      if (type === "heading5") return `<h5 id="${nextId}">${children}</h5>`;
      if (type === "heading6") return `<h6 id="${nextId}">${children}</h6>`;

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

        <div className="grid grid-cols-[300px_1fr_300px] gap-8 items-start pt-8">
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
                    {pageData.data.directions.map((ing, index: number) => (
                      <li key={ing.name[0]?.text} className="text-xs py-1">
                        <Link
                          to={`#heading-${index}`}
                          className="text-indigo-700 underline hover:text-indigo-600 active:text-indigo-800"
                        >
                          {ing.name[0]?.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              </CardContent>
            </SimpleCard>
          </div>

          <main className="prose lg:prose-x overflow-hidden max-w-none">
            <div>
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
          </main>

          <div className="sticky top-8">
            <SimpleCard>
              <CardContent>
                <aside>
                  <h2 className="font-semibold">Meta</h2>
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
          </div>
        </div>
      </div>
    </Background>
  );
}
