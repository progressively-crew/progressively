import { LinksFunction, LoaderFunction } from "@remix-run/node";
import theme from "highlight.js/styles/github.css";
import shared from "../../styles/shared.css";
import { client } from "~/modules/prismic/client";
import { Link, useLoaderData } from "@remix-run/react";
import { Background } from "~/components/Background";
import { InertWhenNavOpened } from "~/components/Nav/InertWhenNavOpened";
import { NavProvider } from "~/components/Nav/providers/NavProvider";
import { SiteNav } from "~/components/SiteNav";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: theme,
    },
    {
      rel: "stylesheet",
      href: shared,
    },
  ];
};

interface Entry {
  link: string;
  title: string;
  image: string;
  time: string;
}

interface LoaderData {
  recipes: Array<Entry>;
  posts: Array<Entry>;
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const rawRecipes = await client.getAllByType("recipe_post");
  const rawPosts = await client.getAllByType("blog_post");

  const recipes = rawRecipes.map((recipe) => ({
    link: `/recipes/${recipe.uid}`,
    title: recipe.data.title[0]?.text || "",
    image: recipe.data.cover.url || "",
    time: String(recipe.data.publishedat),
  }));

  const posts = rawPosts.map((post) => ({
    link: `/blog/${post.uid}`,
    title: post.data.title[0]?.text || "",
    image: post.data.cover.url || "",
    time: String(post.data.publishedat),
  }));

  return {
    recipes,
    posts,
  };
};

export default function BlogHome() {
  const { recipes, posts } = useLoaderData<LoaderData>();

  return (
    <Background>
      <NavProvider>
        <div>
          <SiteNav />

          <InertWhenNavOpened>
            <main className="p-4 xl:p-12">
              <div>
                <h1 className="font-bold leading-tight text-5xl max-w-screen-md pb-12">
                  Blog
                </h1>

                <div className="grid lg:grid-cols-2 gap-4">
                  <section>
                    <h2 className="font-semibold text-3xl leading-normal">
                      Posts
                    </h2>

                    <ul className="pt-4">
                      {posts.map((post) => (
                        <li
                          key={post.link}
                          className="flex flex-row gap-4 items-center"
                        >
                          <img
                            src={post.image}
                            alt=""
                            className="object-cover"
                            width="150px"
                            height="70px"
                            style={{
                              height: 70,
                            }}
                          />

                          <div className="leading-relaxed">
                            <Link to={post.link}>{post.title}</Link>
                            <div className="text-gray-600 text-sm">
                              Published the{" "}
                              <time dateTime={post.time}>{post.time}</time>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className="font-semibold text-3xl leading-normal">
                      Recipes
                    </h2>

                    <ul className="pt-4">
                      {recipes.map((recipe) => (
                        <li
                          key={recipe.link}
                          className="flex flex-row gap-4 items-center"
                        >
                          <img
                            src={recipe.image}
                            alt=""
                            className="object-cover"
                            width="150px"
                            height="70px"
                            style={{
                              height: 70,
                            }}
                          />

                          <div className="leading-relaxed">
                            <Link to={recipe.link}>{recipe.title}</Link>
                            <div className="text-gray-600 text-sm">
                              Published the{" "}
                              <time dateTime={recipe.time}>{recipe.time}</time>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </main>
          </InertWhenNavOpened>
        </div>
      </NavProvider>
    </Background>
  );
}
