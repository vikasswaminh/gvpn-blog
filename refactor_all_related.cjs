const fs = require('fs');
const path = require('path');

const blogDir = 'c:/Users/DELL 3511 (243597)/Downloads/gvpn-blog/src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find all 'Related Reading' lines
    const relatedRegex = /^[ \t]*>[ \t]+\*\*Related.*?\n(?:[ \t]*\n)?/gm;
    let relatedBlocks = [];
    let match;
    
    while ((match = relatedRegex.exec(content)) !== null) {
        relatedBlocks.push(match[0].trim());
    }
    
    if (relatedBlocks.length === 0) {
        // console.log(`No related blocks in ${file}`);
        continue;
    }
    
    // Remove the related blocks from original location
    content = content.replace(relatedRegex, '');
    
    // Find the end of frontmatter
    // Frontmatter is between the first two `---`
    let parts = content.split(/^---$/m);
    if (parts.length < 3) {
        console.log(`Skipping ${file}: couldn't parse frontmatter.`);
        continue;
    }
    
    // parts[0] is empty or whitespace before first ---
    // parts[1] is the frontmatter
    // parts[2] onwards is the rest of the file
    
    let restOfFile = parts.slice(2).join('---');
    
    // Strip leading newlines from restOfFile so we don't end up with massive gaps
    restOfFile = restOfFile.replace(/^\s+/, '');
    
    // Format the related blocks
    const formattedRelated = relatedBlocks.join('\n> \n') + '\n\n';
    
    const newContent = `${parts[0]}---${parts[1]}---\n\n${formattedRelated}${restOfFile}`;
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${file} with ${relatedBlocks.length} related links.`);
}
