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
  ingredients: Array<string>;
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
      if (type === "preformatted") {
        const className =
          children[0] === "$" ? "hljs language-shell" : "hljs language-ts";

        return `<pre><code class="${className}">${children}</code></pre>`;
      }

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
    const ingredients = pageData.data.ingredients.map((ing) =>
      asHTML(ing?.name, null, htmlSerializer)
    );

    pageData.data.ingredients = [];
    pageData.data.content = [];

    return {
      pageData,
      html,
      ingredients,
    };
  } catch {
    throw redirect("/404");
  }
};

export default function RecipePost() {
  const { pageData, html, ingredients } = useLoaderData<LoaderData>();

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
    <Background>
      <div className="py-4 xl:py-12 max-w-screen-2xl mx-auto px-4 xl:px-12">
        <div>
          <div className="inline-block">
            <p className="flex flex-row gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-2 items-center">
              <GiCook aria-hidden />
              <span>Recipe</span>
            </p>
          </div>

          <Title value={pageData.data.title} />
        </div>

        <div className="lg:grid lg:grid-cols-[360px_1fr] xl:grid-cols-[360px_1fr_360px] gap-8 items-start pt-8">
          <div className="xl:sticky top-8">
            <SimpleCard>
              <CardContent>
                <aside>
                  <h2 className="font-semibold">Ingredients</h2>
                  <ul className="list-disc list-inside pt-4">
                    {ingredients.map((ing) => (
                      <li
                        key={ing}
                        className="text-sm py-1"
                        dangerouslySetInnerHTML={{ __html: ing }}
                      />
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
                      <li key={ing.name[0]?.text} className="text-sm py-1">
                        <Link to={`#heading-${index}`}>
                          {ing.name[0]?.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              </CardContent>
            </SimpleCard>

            <div className="h-8 xl:h-0" />
          </div>

          <main className="prose xl:prose-x overflow-hidden max-w-none">
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

          <div className="hidden xl:block xl:sticky top-8">
            <SimpleCard>
              <CardContent>
                <aside>
                  <h2 className="font-semibold">Useful links</h2>
                  <ul className="pt-4">
                    {pageData.data.links.map((link) => (
                      <li key={link.href} className="text-sm py-1">
                        <a
                          href={link.href || "/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-row gap-2 items-center"
                        >
                          {link?.icon?.url && (
                            <img src={link.icon.url} alt="" />
                          )}
                          <span>{link.children}</span>
                        </a>
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
