const fs = require('fs');
const path = require('path');

const blogDir = 'c:/Users/DELL 3511 (243597)/Downloads/gvpn-blog/src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find all 'Related Reading' lines. They start with "> **Related"
    // Use a simpler regex and split logic.
    let lines = content.split(/\r?\n/);
    let relatedBlocks = [];
    let newLines = [];
    
    for (let line of lines) {
        if (line.trim().startsWith('> **Related')) {
            relatedBlocks.push(line.trim());
        } else {
            newLines.push(line);
        }
    }
    
    if (relatedBlocks.length === 0) {
        continue;
    }
    
    // Reconstruct without the related lines
    content = newLines.join('\n');
    
    // Now insert them right after the frontmatter
    let parts = content.split(/^---$/m);
    if (parts.length < 3) {
        console.log(`Skipping ${file}: couldn't parse frontmatter.`);
        continue;
    }
    
    let restOfFile = parts.slice(2).join('---');
    
    // Strip empty lines
    restOfFile = restOfFile.replace(/^\s+/, '');
    
    const formattedRelated = relatedBlocks.join('\n\n') + '\n\n';
    
    const newContent = `${parts[0]}---${parts[1]}---\n\n${formattedRelated}${restOfFile}`;
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${file} with ${relatedBlocks.length} related links.`);
}
