import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET() {
  const blogPosts = await getBlogPostList();
  const feed = new RSS({
    title: BLOG_TITLE,
    description: "Cute little blog",
  });
  blogPosts.map((p) => feed.item({ title: p.title, description: p.abstract, date: p.publishedOn }));

  return new Response(feed.xml(), {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
