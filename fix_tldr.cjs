const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix `<details class="tldr-box" open>` -> `<article class="tldr-box">`
  content = content.replace(/<details class="tldr-box"[^>]*>([\s\S]*?)<\/details>/g, '<article class="tldr-box">$1</article>');

  // Fix `<div class="tldr-box">` -> `<article class="tldr-box">`
  content = content.replace(/<div class="tldr-box">([\s\S]*?)<\/div>/g, '<article class="tldr-box">$1</article>');
  
  // Also remove `<div class="bp-intro">` wrapping the article, to match exactly.
  // We can just leave bp-intro if it wraps more than the article, but often it wraps the article and some text.
  
  // Fix `<h3 id="tl-dr">TL;DR</h3>` -> `<h3>TL;DR</h3>`
  content = content.replace(/<h3 id="tl-dr">TL;DR<\/h3>/gi, '<h3>TL;DR</h3>');

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed TLDR boxes in ' + files.length + ' files');
