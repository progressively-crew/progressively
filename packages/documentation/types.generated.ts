// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for Blog post documents */
interface BlogPostDocumentData {
    /**
     * title field in *Blog post*
     *
     * - **Field Type**: Title
     * - **Placeholder**: *None*
     * - **API ID Path**: blog_post.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * publishedAt field in *Blog post*
     *
     * - **Field Type**: Date
     * - **Placeholder**: *None*
     * - **API ID Path**: blog_post.publishedat
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/date
     *
     */
    publishedat: prismicT.DateField;
    /**
     * content field in *Blog post*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: blog_post.content
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    content: prismicT.RichTextField;
}
/**
 * Blog post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;
/** Content for Recipe post documents */
interface RecipePostDocumentData {
    /**
     * title field in *Recipe post*
     *
     * - **Field Type**: Title
     * - **Placeholder**: *None*
     * - **API ID Path**: recipe_post.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * publishedAt field in *Recipe post*
     *
     * - **Field Type**: Date
     * - **Placeholder**: *None*
     * - **API ID Path**: recipe_post.publishedat
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/date
     *
     */
    publishedat: prismicT.DateField;
    /**
     * content field in *Recipe post*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: recipe_post.content
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    content: prismicT.RichTextField;
    /**
     * ingredients field in *Recipe post*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: recipe_post.ingredients[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    ingredients: prismicT.GroupField<Simplify<RecipePostDocumentDataIngredientsItem>>;
    /**
     * directions field in *Recipe post*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: recipe_post.directions[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    directions: prismicT.GroupField<Simplify<RecipePostDocumentDataDirectionsItem>>;
}
/**
 * Item in Recipe post → ingredients
 *
 */
export interface RecipePostDocumentDataIngredientsItem {
    /**
     * name field in *Recipe post → ingredients*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: recipe_post.ingredients[].name
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    name: prismicT.RichTextField;
}
/**
 * Item in Recipe post → directions
 *
 */
export interface RecipePostDocumentDataDirectionsItem {
    /**
     * name field in *Recipe post → directions*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: recipe_post.directions[].name
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    name: prismicT.RichTextField;
}
/**
 * Recipe post document from Prismic
 *
 * - **API ID**: `recipe_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RecipePostDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<RecipePostDocumentData>, "recipe_post", Lang>;
export type AllDocumentTypes = BlogPostDocument | RecipePostDocument;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { BlogPostDocumentData, BlogPostDocument, RecipePostDocumentData, RecipePostDocumentDataIngredientsItem, RecipePostDocumentDataDirectionsItem, RecipePostDocument, AllDocumentTypes };
    }
}
