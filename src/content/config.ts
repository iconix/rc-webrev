import { z, defineCollection } from 'astro:content';

// define a `type` and `schema` for each collection
const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      draft: z.boolean().default(false),  // TODO: use
      tags: z.array(z.string())
    })
});

const streamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    pubDate: z.union([
      z.date(),
      z.string().transform((str) => new Date(str))
    ]),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  })
});

const nowCollection = defineCollection({
  type: 'content',
  schema: z.object({
    pubDate: z.date(),
    draft: z.boolean().default(false)
  })
});

// export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
  stream: streamCollection,
  now: nowCollection,
};
