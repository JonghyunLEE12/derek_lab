import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'> | CollectionEntry<'insights'>;
const newestFirst = (a: Post, b: Post) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id);

export async function getPosts() {
  return (await getCollection('blog')).sort(newestFirst);
}

export async function getInsights() {
  return (await getCollection('insights')).sort(newestFirst);
}

export async function getAllPosts() {
  return (await Promise.all([getPosts(), getInsights()])).flat().sort(newestFirst);
}

export const siteUrl = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const postUrl = (id: string, collection: Post['collection'] = 'blog') =>
  siteUrl(`${collection}/${id.split('/').map(encodeURIComponent).join('/')}/`);
export const tagUrl = (tag: string) => siteUrl(`tags/${encodeURIComponent(tag)}/`);
export const formatDate = (date: Date) => new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
}).format(date);

export function youtubeId(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) return;
    const host = url.hostname.replace(/^www\./, '');
    const parts = url.pathname.split('/').filter(Boolean);
    const id = host === 'youtu.be' ? parts[0]
      : ['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)
        ? (url.pathname === '/watch' ? url.searchParams.get('v')
          : ['embed', 'shorts', 'live'].includes(parts[0] ?? '') ? parts[1] : undefined)
        : undefined;
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : undefined;
  } catch {
    return;
  }
}
