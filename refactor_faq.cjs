const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'content', 'blog');
const globalCssPath = path.join(__dirname, 'src', 'styles', 'global.css');

// CSS to append
const meshFaqCss = `
/* Mesh FAQ Styles */
.prose details.mesh-faq {
  border: 1px solid #ef4444;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  padding: 0;
}
.prose details.mesh-faq summary {
  list-style: none;
  padding: 32px 16px 16px 16px;
  font-weight: 600;
  font-size: 1.125rem;
  color: #111827;
  cursor: pointer;
  margin: 0;
  border-bottom: none;
}
.prose details.mesh-faq summary::-webkit-details-marker {
  display: none;
}
.prose details.mesh-faq summary::after {
  content: "⌄";
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: #4b5563;
}
.prose details.mesh-faq[open] summary::after {
  content: "⌃";
}
.prose details.mesh-faq[open] summary {
  border-bottom: none;
  margin-bottom: 0;
}
.prose details.mesh-faq .faq-badge {
  position: absolute;
  top: 12px;
  left: 16px;
  background-color: #fee2e2;
  color: #ef4444;
  border: 1px solid #fca5a5;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.prose details.mesh-faq p {
  padding: 0 16px 16px 16px;
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}
`;

// 1. Append CSS to global.css if not present
let globalCss = fs.readFileSync(globalCssPath, 'utf8');
if (!globalCss.includes('details.mesh-faq')) {
    fs.writeFileSync(globalCssPath, globalCss + '\n' + meshFaqCss, 'utf8');
    console.log('Appended mesh-faq styles to global.css');
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove old style blocks from the file if they exist
    const styleRegex = /<style>[\s\S]*?\.mesh-faq[\s\S]*?<\/style>\s*/g;
    content = content.replace(styleRegex, '');

    // Now let's find all <details> blocks
    const detailsRegex = /<details[^>]*>([\s\S]*?)<\/details>/g;
    let modified = false;

    content = content.replace(detailsRegex, (match, innerContent) => {
        // If it's already a mesh-faq and properly formatted, we might still want to parse it to ensure it matches the strict format or leave it.
        // Actually, let's parse summary and content out of it.
        
        let summaryMatch = innerContent.match(/<summary[^>]*>([\s\S]*?)<\/summary>/);
        if (!summaryMatch) return match; // skip if no summary

        let summaryText = summaryMatch[1].trim();
        // Remove existing badge if present
        summaryText = summaryText.replace(/<span class="faq-badge">FAQ<\/span>\s*/, '');
        // Clean up Q1., Q2. etc
        summaryText = summaryText.replace(/^Q\d+\.\s*/, '');
        // Clean up <span itemprop="name"> or similar inside summary
        summaryText = summaryText.replace(/<[^>]+>/g, (m) => m.startsWith('<a') || m.startsWith('</a') ? m : ''); // keep links, remove other tags
        
        // Extract the answer part
        let answerContent = innerContent.replace(/<summary[^>]*>[\s\S]*?<\/summary>/, '').trim();
        
        // If the answer is wrapped in Schema markup like <div itemprop="acceptedAnswer">
        if (answerContent.includes('itemprop="acceptedAnswer"')) {
            // Try to extract just the text inside <div itemprop="text">
            let textMatch = answerContent.match(/<div[^>]*itemprop="text"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
            if (textMatch) {
                answerContent = textMatch[1].trim();
            }
        }

        // Clean up wrapping <p> if it already has it, so we don't double wrap, or just ensure it is wrapped in exactly one <p>
        // But wait, the answer might contain multiple paragraphs or lists.
        // If it's simple text without <p>, we should wrap it. If it has <p>, we should keep it.
        // Let's just strip wrapping <p> and then wrap the whole thing in <p> if it doesn't contain block elements, 
        // OR simply wrap in a <div class="faq-content"> and style the p inside. 
        // But the previous style uses `.mesh-faq p`. Let's just output it directly, and if it doesn't start with <p>, we wrap it.
        
        if (!answerContent.startsWith('<p>') && !answerContent.includes('<p>')) {
            answerContent = `<p>${answerContent}</p>`;
        }

        // Remove any <details> classes from the match and rebuild it
        modified = true;
        return `<details class="mesh-faq">\n  <summary>\n    <span class="faq-badge">FAQ</span>\n    ${summaryText.trim()}\n  </summary>\n  ${answerContent}\n</details>`;
    });

    if (modified || content !== fs.readFileSync(filePath, 'utf8')) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated FAQs in ${file}`);
    }
}
