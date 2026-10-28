import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts, postUrl, siteUrl } from '../lib/posts';

export async function GET(context: APIContext) {
  return rss({
    title: 'Derek Lab',
    description: 'Derek이 공부하며 배운 것을 차곡차곡 기록하는 공간입니다.',
    site: new URL(siteUrl(), context.site!),
    items: (await getAllPosts()).map(({ id, data, collection }) => ({ title: data.title, description: data.description, pubDate: data.pubDate, categories: ['category' in data ? data.category : '인사이트', ...data.tags], link: postUrl(id, collection) })),
    customData: '<language>ko</language>',
  });
}
