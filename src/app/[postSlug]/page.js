import React from "react";
import dynamic from "next/dynamic";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import CodeSnippet from "@/components/CodeSnippet";
// import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
const DivisionGroupsDemo = dynamic(() => import("@/components/DivisionGroupsDemo"));
const CircularColorsDemo = dynamic(() => import("@/components/CircularColorsDemo"));

import { loadBlogPost } from "@/helpers/file-helpers";

export async function generateMetadata({ params }) {
  const post = (await loadBlogPost(params.postSlug)).frontmatter;
  return {
    title: post.title,
    description: post.abstract,
  };
}

const components = {
  pre: (props) => <CodeSnippet {...props} />,
  DivisionGroupsDemo,
  CircularColorsDemo,
};

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={post.frontmatter.title} publishedOn={post.frontmatter.publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
