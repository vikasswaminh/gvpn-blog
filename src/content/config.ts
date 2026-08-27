import { defineCollection, z } from 'astro:content';

// The blog collection. Each post is a markdown file in src/content/blog/*.md
// with the frontmatter below. See CONTRIBUTING.md for the authoring guide.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
