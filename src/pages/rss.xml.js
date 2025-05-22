import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getBlogPath } from '../utils/params.ts';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => Date.parse(b.data.pubDate) - Date.parse(a.data.pubDate));

  return rss({
    title: 'blog | nadja rhodes',
    description: 'slow is smooth, and smooth is fast',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getBlogPath(post),
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss.xsl',
  });
}
