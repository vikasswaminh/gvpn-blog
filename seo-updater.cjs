const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// Map of slug to Title for internal linking
const blogIndex = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
    if (titleMatch) {
        blogIndex.push({
            slug: file.replace('.md', ''),
            title: titleMatch[1]
        });
    }
});

function getKeywordsFromTitle(title) {
    const words = title.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
    const keywords = ['meshwg', 'wireguard', 'vpn', 'secure remote access'];
    
    if (title.toLowerCase().includes('sd-wan')) keywords.push('sd-wan alternative');
    if (title.toLowerCase().includes('site-to-site')) keywords.push('site-to-site vpn');
    if (title.toLowerCase().includes('home network')) keywords.push('home vpn setup');
    if (title.toLowerCase().includes('rdp')) keywords.push('remote desktop vs vpn');
    
    return keywords.map(k => `"${k}"`).join(', ');
}

files.forEach(file => {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Add seoKeywords if missing
    if (!content.includes('seoKeywords:')) {
        const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
        const title = titleMatch ? titleMatch[1] : '';
        const keywords = getKeywordsFromTitle(title);
        
        content = content.replace(
            /(tags:\s*\[.*?\])/,
            `$1\nseoKeywords: [${keywords}]`
        );
        modified = true;
    }

    // 2. Add Related Reading if missing
    if (!content.includes('> **Related Reading:**')) {
        // Pick 2 random other blogs to link to
        const otherBlogs = blogIndex.filter(b => b.slug !== file.replace('.md', ''));
        const link1 = otherBlogs[Math.floor(Math.random() * otherBlogs.length)];
        let link2 = otherBlogs[Math.floor(Math.random() * otherBlogs.length)];
        while(link2.slug === link1.slug) {
            link2 = otherBlogs[Math.floor(Math.random() * otherBlogs.length)];
        }

        const relatedLinks = `\n> **Related Reading:** [${link1.title}](/blog/${link1.slug}/)\n\n> **Related Reading:** [${link2.title}](/blog/${link2.slug}/)\n`;
        
        // Insert right after frontmatter
        content = content.replace(/---\r?\n\r?\n?/, `---${relatedLinks}\n`);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});

console.log('SEO optimization complete!');
