const fs = require('fs');
const path = require('path');

const blogDir = 'c:/Users/DELL 3511 (243597)/Downloads/gvpn-blog/src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    
    const relatedCount = (content.match(/> \*\*Related Reading:\*\*/g) || []).length;
    
    // Find where the related reading blocks are relative to frontmatter, tldr, and intro
    let firstRelatedIndex = content.indexOf('> **Related Reading:**');
    let tldrIndex = content.indexOf('class="tldr-box"');
    let introIndex = content.indexOf('class="post-block intro"');
    
    if (firstRelatedIndex === -1) firstRelatedIndex = 'N/A';
    if (tldrIndex === -1) tldrIndex = 'N/A';
    if (introIndex === -1) introIndex = 'N/A';
    
    console.log(`${file} -> Related Count: ${relatedCount}, First Related: ${firstRelatedIndex}, TLDR: ${tldrIndex}, Intro: ${introIndex}`);
}
