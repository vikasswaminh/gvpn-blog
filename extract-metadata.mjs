import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) return;
  const frontmatterStr = frontmatterMatch[1];
  
  const getField = (field) => {
    const regex = new RegExp(`^${field}:\\s*(.*)$`, 'm');
    const match = frontmatterStr.match(regex);
    if (!match) return null;
    let val = match[1].trim();
    return val.replace(/^['"](.*)['"]$/, '$1');
  };

  const title = getField('title');
  const description = getField('description');

  let needsFix = false;
  if (title && title.length > 75) needsFix = true;
  if (description && description.length > 180) needsFix = true;
  
  // also check links for multi-location
  let needsLink = file === 'how-to-build-a-multi-location-wireguard-network-with-routers.md';

  if (needsFix || needsLink) {
    console.log(`\nFILE: ${file}`);
    if (title && title.length > 75) {
      console.log(`TITLE (${title.length}): ${title}`);
    }
    if (description && description.length > 180) {
      console.log(`DESC (${description.length}): ${description}`);
    }
    if (needsLink) {
      console.log(`NEEDS INTERNAL LINK`);
    }
  }
});
