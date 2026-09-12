import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  
  // We only include published posts in the search index (if there's a draft logic, 
  // but let's assume they're all published or filtered in getCollection)
  // Actually, let's filter just in case.
  const publishedPosts = posts.filter(post => !post.data.draft);

  const searchData = publishedPosts.map(post => ({
    title: post.data.title,
    slug: post.slug,
    description: post.data.description,
    keywords: (post.data.seoKeywords || []).join(' ')
  }));

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Cache heavily as this is statically generated
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
