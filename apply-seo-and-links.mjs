import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// First pass: extract all titles and slugs for linking
const postsData = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const titleMatch = content.match(/^title:\s*['"](.*?)['"]/m);
  const title = titleMatch ? titleMatch[1] : 'WireGuard Networking Guide';
  const slug = file.replace('.md', '');
  postsData.push({ file, title, slug });
}

let modifiedCount = 0;

for (let i = 0; i < postsData.length; i++) {
  const currentPost = postsData[i];
  const filePath = path.join(blogDir, currentPost.file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find two other posts for related reading
  const link1 = postsData[(i + 1) % postsData.length];
  const link2 = postsData[(i + 2) % postsData.length];
  
  // 1. Strip existing Related Read/Reading blocks
  // Remove the new blockquote style
  content = content.replace(/^>\s*\*\*Related Reading:\*\*.*$/gm, '');
  // Remove the old ### Related Read style
  content = content.replace(/### Related Read\nFor more on this topic, read our guide on \[.*?\]\(.*?\)\./g, '');
  
  // Clean up extra blank lines created by the removal at the top of the body
  
  // 2. Extract Frontmatter and Body
  const parts = content.split('---');
  if (parts.length < 3) {
    console.warn(`Could not parse frontmatter in ${currentPost.file}`);
    continue;
  }
  
  let frontmatter = parts[1];
  let body = parts.slice(2).join('---');
  
  // Trim body to remove leading newlines left by previous blockquotes
  body = body.trimStart();
  
  // Ensure SEO fields exist (they should, but just in case)
  if (!frontmatter.includes('seoKeywords:')) {
    frontmatter += `seoKeywords: ["WireGuard VPN", "Enterprise routing", "mesh network"]\n`;
  }
  if (!frontmatter.includes('description:')) {
    frontmatter += `description: 'A comprehensive guide on modern WireGuard VPN architecture.'\n`;
  }
  if (!frontmatter.includes('title:')) {
    frontmatter += `title: '${currentPost.title}'\n`;
  }

  // 3. Construct new Related Reading block
  const relatedBlock = `> **Related Reading:** [${link1.title}](/blog/${link1.slug}/)
>
> **Related Reading:** [${link2.title}](/blog/${link2.slug}/)

`;

  // 4. Reassemble file
  const newContent = `---${frontmatter}---

${relatedBlock}${body}`;

  fs.writeFileSync(filePath, newContent, 'utf8');
  modifiedCount++;
}

console.log(`Successfully updated SEO tags and Related Reading formatting for ${modifiedCount} files.`);
