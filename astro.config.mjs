// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  site: 'https://ohnadj.pages.dev/',

  integrations: [svelte()],

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: {
            type: 'element',
            tagName: 'span',
            properties: { className: ['heading-link'] },
            children: [
              {
                type: 'element',
                tagName: 'img',
                properties: { src: '/link.svg' },
                children: [],
              },
            ],
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          content: {
            type: 'element',
            tagName: 'img',
            properties: {
              src: '/external-link.svg',
              alt: 'External link icon',
            },
            children: [],
          },
          contentProperties: { className: ['external-link-icon'] },
          target: '_blank',
          rel: 'nofollow noopener noreferrer'
        }
      ]
    ]
  },
});
