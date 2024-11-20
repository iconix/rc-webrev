import type { CollectionEntry } from 'astro:content';

export function getBlogPath(post: CollectionEntry<'blog'>, includeBlog = true) {
    const pubDate = post.data.pubDate;

    const pubYear = String(pubDate.getFullYear()).padStart(4, '0');
    const pubMonth = String(pubDate.getMonth() + 1).padStart(2, '0');
    const pubDay = String(pubDate.getDate()).padStart(2, '0');
    const slug = post.slug;

    return includeBlog ? `/blog/${pubYear}/${pubMonth}/${slug}` : `/${pubYear}/${pubMonth}/${slug}`;
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
}

export function formatTime(date: Date) {
    // this language tag also sets hourCycle to 'h23'
    return new Intl.DateTimeFormat('en-US-u-hc-h23', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
}

export function formatUrlDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1);
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}
