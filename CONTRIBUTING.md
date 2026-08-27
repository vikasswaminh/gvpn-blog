# Writing for this blog

This repo powers **`blogs.<project>.com`**. When a post is merged to `main`, it builds and goes
live automatically in about a minute. You do **not** need to touch any code or run anything.

## What you can edit

✅ **Add or edit posts** in `src/content/blog/` — one Markdown (`.md`) file per post.
✅ **Add images** in `public/` and reference them as `/my-image.png`.

That's it. Everything else (layout, styling, build, deploy config) is locked and maintained by
NH Ops — a pull request that touches those files needs owner review before it can merge. This is
by design, so a typo in a config file can never take the site down.

## Add a new post (easiest — right in GitHub)

1. Go to the **`src/content/blog/`** folder in this repo.
2. Click **Add file → Create new file**.
3. Name it with lowercase words and dashes, ending in `.md` — e.g. `best-vpn-for-android.md`.
   **This filename becomes the URL:** `/blog/best-vpn-for-android/`.
4. Paste the template below, edit it, then **Commit** → **Create a pull request**.
5. Because you're only adding a post, you can **merge your own PR** immediately. Done — it deploys.

## Post template

```markdown
---
title: 'Your headline here'
description: 'One or two sentences for search results and social cards (~150 chars).'
pubDate: 2026-08-27
author: 'Your Name'
tags: ['guides', 'privacy']
---

Write your post here in **Markdown**.

## A section heading

- bullet points
- work fine

Add a link like [this](https://example.com), or an image: `![alt text](/my-image.png)`.
```

### Frontmatter fields (the part between the `---` lines)

| Field         | Required | Notes                                                        |
| ------------- | -------- | ------------------------------------------------------------ |
| `title`       | yes      | The headline.                                                |
| `description` | yes      | ~150 chars. Shows in Google + social previews.               |
| `pubDate`     | yes      | `YYYY-MM-DD`. Controls ordering (newest first).              |
| `author`      | no       | Defaults to the site author.                                 |
| `tags`        | no       | A list, e.g. `['guides', 'privacy']`. Creates tag pages.     |
| `cover`       | no       | Path to a header image in `public/`, e.g. `/covers/foo.png`. |
| `draft`       | no       | `true` hides the post from the live site (preview only).     |

## Tips

- Keep the filename lowercase-with-dashes — it's the permanent URL, so don't rename it later.
- Quote the `title` and `description` values, especially if they contain a `:` or `'`.
- Set `draft: true` while you're still writing; remove it (or set `false`) to publish.
- Questions or something you can't edit? Ping NH Ops.
