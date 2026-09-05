const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'content', 'blog');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  
  files.forEach(file => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // 1. Replace TL;DR box with Key Takeaways Callout
      content = content.replace(/<div class="tldr-box">\s*<h3>TL;DR<\/h3>/g, '<div class="callout callout-note">\n<strong>Key Takeaways</strong>');
      // If there's a tldr-box without the h3, just replace the div
      content = content.replace(/<div class="tldr-box">/g, '<div class="callout callout-note">\n<strong>Key Takeaways</strong>');

      // 2. Replace ad-hoc blockquotes with strong tags into callouts
      // e.g. > **Note:** Something -> <div class="callout callout-note"><strong>Note</strong> Something</div>
      content = content.replace(/^>\s*\*\*(Note|Important|Warning|Tip|Security):\*\*(.*)$/gm, (match, type, text) => {
        const calloutClass = `callout-${type.toLowerCase()}`;
        return `<div class="callout ${calloutClass}"><strong>${type}</strong>${text}</div>`;
      });
      
      // Also catch > **Note** (without colon)
      content = content.replace(/^>\s*\*\*(Note|Important|Warning|Tip|Security)\*\*(.*)$/gm, (match, type, text) => {
        const calloutClass = `callout-${type.toLowerCase()}`;
        return `<div class="callout ${calloutClass}"><strong>${type}</strong>${text}</div>`;
      });

      // 3. Demote any # Headings in the body to ## Headings
      // We skip the frontmatter.
      const parts = content.split('---');
      if (parts.length >= 3) {
        let body = parts.slice(2).join('---');
        // replace ^# Heading with ^## Heading
        body = body.replace(/^#\s+(.+)$/gm, '## $1');
        
        content = parts[0] + '---' + parts[1] + '---' + body;
      }

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  });
});
