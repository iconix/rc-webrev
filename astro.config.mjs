// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import svelte from '@astrojs/svelte';

import mdx from '@astrojs/mdx';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  site: 'https://ohnadj.pages.dev/',

  integrations: [svelte(), mdx()],

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeExternalLinks,
        {
          content: {
            type: 'element',
            tagName: 'img',
            properties: {
              src: '/assets/external-link.svg',
              alt: 'External link icon',
            },
            children: [],
          },
          contentProperties: { className: ['external-link-icon'] },
          target: '_blank',
          rel: 'nofollow noopener noreferrer'
        }
      ],
      function rehypeCollectHeadings() {
        return (tree) => {
          const headings = [];
          visit(tree, 'element', (node) => {
            if (node.tagName.match(/^h[1-6]$/)) {
              const text = toString(node);
              const slug = node.properties.id;
              headings.push({
                depth: parseInt(node.tagName[1]),
                text,
                slug
              });
            }
          });
          tree.headings = headings;
        };
      }
    ]
  },
});
