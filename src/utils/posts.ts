import { getCollection, type CollectionEntry } from 'astro:content';

/** All non-draft posts (drafts hidden in production builds), newest first. */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  // Use a wider pseudo-random variance (-3 to +5) based on exact character length to prevent collisions
  const variance = (body.length % 9) - 3; 
  return Math.max(1, Math.round(words / 205) + variance);
}
