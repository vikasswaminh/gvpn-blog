const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('src/content/blog').filter(f => f.endsWith('.md'));
const tags = {};
files.forEach(f => {
  const content = fs.readFileSync(path.join('src/content/blog', f), 'utf-8');
  const lines = content.split('\n');
  let inTags = false;
  lines.forEach(l => {
    if (l.startsWith('tags:')) { inTags = true; return; }
    if (inTags && l.trim().startsWith('-')) {
      const t = l.replace('-', '').replace(/'/g, '').trim();
      tags[t] = (tags[t] || 0) + 1;
    } else if (inTags && !l.trim().startsWith('-') && l.trim() !== '') {
      inTags = false;
    }
  });
});
console.log(JSON.stringify(tags, null, 2));
