const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

const faqTemplate = `

## Frequently Asked Questions (FAQ)

<details>
<summary>How does a mesh VPN differ from a traditional VPN?</summary>
A traditional VPN routes all traffic through a central gateway, creating a bottleneck. A mesh VPN establishes direct, peer-to-peer connections between all devices (like branch offices or cloud servers), reducing latency and eliminating a single point of failure.
</details>

<details>
<summary>Does MeshWG require installing software on every device?</summary>
No. MeshWG can be deployed directly on your existing edge routers (like TP-Link, MikroTik, or OpenWrt). This provides agentless, site-wide protection for all devices behind the router without installing VPN clients on individual laptops or IoT devices.
</details>

<details>
<summary>How does WireGuard NAT Traversal work?</summary>
WireGuard doesn't have native NAT traversal, which is why MeshWG provides a cloud coordination plane. It handles UDP hole punching, PersistentKeepalives, and automatic endpoint discovery to seamlessly connect peers behind CGNAT or strict enterprise firewalls.
</details>

---
<div class="cta-box" style="background: var(--bg-2); padding: 32px; border-radius: 12px; text-align: center; margin-top: 48px; border: 1px solid var(--border);">
  <h3 style="margin-top: 0;">Ready to upgrade your enterprise network?</h3>
  <p style="color: var(--text-3); margin-bottom: 24px;">Deploy a high-performance WireGuard mesh network in minutes. No new hardware, no complex CLI configurations, and completely agentless.</p>
  <a href="https://meshwg.com" class="btn btn-primary" style="text-decoration: none; padding: 12px 24px; font-size: 16px;">Try MeshWG Free</a>
</div>
`;

// New infra tags to inject
const extraTags = [
  "'network hardware'",
  "'cloud vpn'",
  "'enterprise routing'",
  "'router configuration'",
  "'network management'",
  "'mesh infrastructure'",
  "'hardware deployment'"
].join(', ');

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add FAQ & CTA
  if (!content.includes('## Frequently Asked Questions') && !content.includes('## FAQ')) {
    content += faqTemplate;
    modified = true;
  }

  // Inject Extra Infra Tags
  if (!content.includes("'network hardware'")) {
    content = content.replace(/tags:\s*\[(.*?)\]/, (match, p1) => {
      modified = true;
      return `tags: [${p1}, ${extraTags}]`;
    });
  }

  // Ensure TL;DR is present if missing
  if (!content.includes('TL;DR')) {
      const tldrTemplate = `\n<div class="bp-intro">\n    <div class="tldr-box">\n      <h3 id="tl-dr">TL;DR</h3>\n      <ul>\n        <li>This is a comprehensive guide to modern enterprise networking and zero-trust architectures.</li>\n      </ul>\n    </div>\n</div>\n`;
      content = content.replace(/---\n\n/, `---\n\n${tldrTemplate}`);
      modified = true;
  }


  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
    modifiedCount++;
  }
}

console.log(`\nSuccessfully updated ${modifiedCount} files with SEO tags, FAQs, CTAs, and TL;DRs.`);
