import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  console.error("FAIL: dist/ directory not found. Did you run npm run build?");
  process.exit(1);
}

const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
if (!fs.existsSync(sitemapIndex)) {
  console.error("FAIL: sitemap-index.xml not found.");
  process.exit(1);
}
console.log("PASS: sitemap-index.xml exists.");

const sitemap0 = path.join(distDir, 'sitemap-0.xml');
if (!fs.existsSync(sitemap0)) {
  console.error("FAIL: sitemap-0.xml not found.");
  process.exit(1);
}
console.log("PASS: sitemap-0.xml exists.");

const robots = path.join(distDir, 'robots.txt');
if (!fs.existsSync(robots)) {
  console.error("FAIL: robots.txt not found.");
  process.exit(1);
}
const robotsContent = fs.readFileSync(robots, 'utf8');
if (!robotsContent.includes('Sitemap: https://blogs.meshwg.com/sitemap-index.xml')) {
  console.error("FAIL: robots.txt does not point to the correct sitemap-index.xml.");
  process.exit(1);
}
console.log("PASS: robots.txt is correct.");

// Check 301 for deleted file (it should exist in dist but be a meta redirect)
const deletedArticleHtml = path.join(distDir, 'blog/wireguard-nat-traversal-cgnat-firewalls-2026/index.html');
if (!fs.existsSync(deletedArticleHtml)) {
  console.error("FAIL: deleted article redirect HTML not built.");
  process.exit(1);
}
const redirectHtml = fs.readFileSync(deletedArticleHtml, 'utf8');
if (!redirectHtml.includes('http-equiv="refresh"')) {
  console.error("FAIL: deleted article is not a redirect.");
  process.exit(1);
}
console.log("PASS: deleted article is correctly a meta redirect.");

// Check a random built article for canonical and schema
const articleHtmlPath = path.join(distDir, 'blog/how-to-set-up-a-wireguard-mesh-vpn/index.html');
if (!fs.existsSync(articleHtmlPath)) {
  console.error("FAIL: article HTML not built.");
  process.exit(1);
}
const html = fs.readFileSync(articleHtmlPath, 'utf8');
if (!html.includes('<link rel="canonical" href="https://blogs.meshwg.com/blog/how-to-set-up-a-wireguard-mesh-vpn/"')) {
  console.error("FAIL: Canonical tag not found or incorrect.");
  process.exit(1);
}
console.log("PASS: Canonical tags are correct.");

const schemaCount = (html.match(/BlogPosting/g) || []).length;
if (schemaCount > 1) {
  console.error("FAIL: Duplicate BlogPosting schema found.");
  process.exit(1);
}
console.log("PASS: No duplicate BlogPosting schema.");

console.log("\nALL VERIFICATIONS PASSED!");
