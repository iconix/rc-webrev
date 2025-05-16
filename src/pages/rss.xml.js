import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getBlogPath } from '../utils/params.ts';

export async function GET(context) {
  const posts = await getCollection('blog');

  return rss({
    title: 'Nadja Rhodes | blog',
    description: 'slow is smooth, and smooth is fast',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getBlogPath(post),
    })),
    customData: `<language>en-us</language>`,
  });
}
