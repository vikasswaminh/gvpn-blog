# Phase 5 — GSC Crawled but Currently Not Indexed Audit

## 1. Executive Summary
This audit evaluated 18 specific URLs reported by Google Search Console under the "Crawled – currently not indexed" status. The analysis confirms that 17 of these URLs are utility/archive pages (tag pages and an RSS feed) where non-indexing is not necessarily an SEO problem. The remaining 1 URL (`tp-link-site-to-site-vpn-wireguard-2026`) is an important article. A deep technical inspection of this article revealed zero technical barriers to indexing—it possesses correct canonicals, no noindex tags, valid schema, and sitemap inclusion. Its current unindexed status does not show a verified technical barrier. The specific reason Google has not indexed it is not available from this audit. 

No immediate technical interventions (such as redirects or code changes) are required for any of these 18 URLs.

## 2. GSC Evidence
- **Total URLs analyzed:** 18
- **Reported GSC Status:** Crawled – currently not indexed
- **Last Crawled Dates:** Provided via user GSC export
- **Overall Site Indexing:** 43 indexed, 18 not indexed

*(Note: Data strictly reflects the provided GSC export. No traffic or algorithmic intent has been fabricated.)*

## 3. URL-by-URL Classification

| URL | Page Type | Classification | Should We Act? | Reason |
|---|---|---|---|---|
| `/tags/enterprise wireguard setup/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/wireguard mesh vpn/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/mesh infrastructure/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/network hardware/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/site-to-site/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/self-hosted/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/management/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/mesh vpn/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/hardware/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/routers/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/setup/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/cgnat/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/cloud/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/wireguard routing guide/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/zero trust/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/tags/ipsec/` | Tag Archive | C. LOW-VALUE/UTILITY | No | Thin content; standard archive behavior. |
| `/rss.xml` | XML Feed | C. LOW-VALUE/UTILITY | No | Not an HTML web page; Google crawls for discovery but does not index in web results. |
| `/blog/tp-link-site-to-site-vpn-wireguard-2026/` | Article | A. IMPORTANT ARTICLE | Monitor | Important article; no verified technical indexing barrier was identified. Monitor its indexing status. |

## 4. Tag Page Analysis
The Astro project dynamically generates tag pages based on frontmatter array data (`src/pages/tags/[tag].astro`).
- **Are they intentionally indexable?** Yes. The `BaseLayout` does not inject a `<meta name="robots" content="noindex">` tag for these routes.
- **Do they contain meaningful unique content?** No. They simply list `PostCard` components (title, summary, date) for articles containing that tag.
- **Is non-indexing a problem?** No. It is extremely common for Google to crawl tag pages (which helps them discover the actual articles) but choose not to index them to prevent "thin content" bloat in search results. There is no SEO penalty for this.

## 5. RSS Analysis
The URL `https://blogs.meshwg.com/rss.xml` is an application/rss+xml feed.
- Googlebot frequently crawls RSS feeds to rapidly discover newly published URLs.
- Google Search explicitly does not index raw XML feeds as standard web search results because they are meant for RSS readers, not human web browsers.
- This is 100% normal behavior and requires no action.

## 6. TP-Link Article Analysis
The article `tp-link-site-to-site-vpn-wireguard-2026` is classified as an **IMPORTANT ARTICLE**. It is a core piece of the "Site-to-Site VPN" pillar.

**Technical Inspection Results:**
- **Indexability:** PASS. No `noindex` tag is present in the generated HTML.
- **Canonical:** PASS. The page contains a valid, self-referencing canonical tag (`<link rel="canonical" href="https://blogs.meshwg.com/blog/tp-link-site-to-site-vpn-wireguard-2026/">`).
- **Sitemap:** PASS. The URL is correctly listed in `sitemap-0.xml`.
- **Internal Links:** PASS. It is discoverable via the index page and tags, and correctly cross-links to Pillar articles (e.g., `wireguard-site-to-site-vpn-how-it-works-2026`).
- **Content depth:** PASS. The article contains substantial TP-Link-specific engineering configuration. Uniqueness was not independently verified against the entire web.
- **Structured Data:** PASS. Valid `BlogPosting` JSON-LD schema is present and matches the visible content.

**Conclusion:** There is **zero technical hindrance** preventing this page from being indexed. Google has crawled and processed the page, but it is currently not included in the index. The specific reason for the current indexing decision is not exposed by this report.

## 7. Technical Issues
- **None.** There are no verifiable technical defects causing the "Crawled - currently not indexed" status for these 18 URLs.

## 8. Recommended Actions
- **P3 (Monitor Only):** Wait for Google to naturally evaluate and index the `tp-link-site-to-site-vpn-wireguard-2026` article. Continue building useful content and legitimate authority while monitoring the article’s indexing status. Do not use the "Request Indexing" tool repeatedly, as it will not bypass quality thresholds.

## 9. What NOT to Change
- **Do not add `noindex` tags to tag pages.** Leaving them crawlable allows search engines to follow their internal links to relevant articles.
- **Do not modify the TP-Link article's SEO metadata.** No technical problems were identified with the canonical, metadata, or structured data during this audit.
- **Do not attempt to force the indexing of `rss.xml`.**

## 10. Build Validation
```text
> nh-blog@1.0.0 build
> astro build
...
12:23:56 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
12:23:56 [build] 69 page(s) built in 14.69s
12:23:56 [build] Complete!
```
The build executes successfully with zero errors. All configurations remain technically robust.
