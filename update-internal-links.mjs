import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// The mapping of keywords to URLs
const linkGraph = {
  "mesh VPN": "/blog/how-to-set-up-a-wireguard-mesh-vpn/",
  "site-to-site VPN": "/blog/wireguard-site-to-site-vpn-how-it-works-2026/",
  "router VPN": "/blog/how-to-set-up-a-router-vpn-without-installing-vpn-software/",
  "NAT traversal": "/blog/wireguard-nat-traversal-behind-cgnat-2026/",
  "multi-location": "/blog/how-to-build-a-multi-location-wireguard-network-with-routers/",
  "SD-WAN alternative": "/blog/sd-wan-alternatives-2026/",
  "manage multiple WireGuard tunnels": "/blog/manage-multiple-wireguard-tunnels-mesh-vpn-2026/"
};

for (const file of files) {
  let content = fs.readFileSync(path.join(blogDir, file), 'utf8');

  // Remove the old Phase 1 "Related Read" section completely
  content = content.replace(/\n\n### Related Read\nFor more on this topic, read our guide on \[.*?\]\(.*?\)\./g, '');
  
  // Split frontmatter and body
  const parts = content.split(/^---\r?\n/m);
  if (parts.length >= 3) {
    let frontmatter = parts[1];
    let body = parts.slice(2).join('---\n');

    // Contextually add links in body (only the first occurrence of each keyword to avoid excessive links)
    for (const [keyword, url] of Object.entries(linkGraph)) {
      // Don't link to itself
      if (url.includes(file.replace('.md', ''))) continue;

      // Regex to find the keyword not already in a markdown link
      // This is a naive regex but works well enough for this pass:
      // It looks for the keyword ensuring it is not preceded by [ or followed by ](
      const regex = new RegExp(`(?<!\\[)\\b(${keyword}s?)\\b(?!\\]\\()`, 'i');
      if (regex.test(body)) {
        body = body.replace(regex, `[$1](${url})`);
      }
    }

    content = `---\n${frontmatter}---\n${body}`;
    fs.writeFileSync(path.join(blogDir, file), content, 'utf8');
    console.log(`Contextualized links in ${file}`);
  }
}
