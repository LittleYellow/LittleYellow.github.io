import { getCollection } from 'astro:content';
export async function publishedPosts() {
  return (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => a.data.order - b.data.order);
}
export const formatDate = (date: Date) => date.toISOString().slice(0, 10).replaceAll('-', '.');
