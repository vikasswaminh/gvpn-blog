const fs = require('fs');
const path = require('path');

const blogDir = 'c:/Users/DELL 3511 (243597)/Downloads/gvpn-blog/src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove lines that contain only ">" or "> " or " > "
    const emptyQuoteRegex = /^[ \t]*>[ \t]*\r?\n/gm;
    let newContent = content.replace(emptyQuoteRegex, '');
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Cleaned up empty blockquotes in ${file}`);
    }
}
