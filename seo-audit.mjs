import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

console.log('| URL | SEO Score | Title | Meta | H2/H3 | Internal Links | Words | Issues |');
console.log('| --- | --------: | ----- | ---- | ----- | -------------- | ----- | ------ |');

files.forEach(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  
  // Parse frontmatter (accounting for \r\n on Windows)
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatterStr = frontmatterMatch ? frontmatterMatch[1] : '';
  const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length) : content;

  // Extract fields
  const getField = (field) => {
    const regex = new RegExp(`^${field}:\\s*(.*)$`, 'm');
    const match = frontmatterStr.match(regex);
    if (!match) return null;
    let val = match[1].trim(); // remove trailing \r
    return val.replace(/^['"](.*)['"]$/, '$1'); // remove quotes
  };

  const title = getField('title');
  const description = getField('description');
  const seoKeywords = getField('seoKeywords');

  let score = 100;
  let issues = [];

  // Title check
  let titleStatus = '✅';
  if (!title) {
    titleStatus = '❌';
    score -= 15;
    issues.push('Missing Title');
  } else if (title.length > 75) {
    titleStatus = '⚠️';
    score -= 5;
    issues.push('Title too long');
  }

  // Meta description check
  let metaStatus = '✅';
  if (!description) {
    metaStatus = '❌';
    score -= 15;
    issues.push('Missing Description');
  } else if (description.length > 180) {
    metaStatus = '⚠️';
    score -= 5;
    issues.push('Desc too long');
  }

  // Keywords check
  if (!seoKeywords) {
    score -= 10;
    issues.push('Missing seoKeywords');
  }

  // H2/H3 check
  const h2Matches = body.match(/^##\s/gm) || body.match(/<h2>/g);
  let hStatus = '✅';
  if (!h2Matches) {
    hStatus = '❌';
    score -= 15;
    issues.push('No H2 tags');
  }

  // Internal Links check (looks for ](/ or ](http)
  const internalLinks = (body.match(/\]\(\/blog\//g) || []).length;
  let linkStatus = '✅';
  if (internalLinks === 0) {
    linkStatus = '❌';
    score -= 10;
    issues.push('No internal links');
  } else if (internalLinks < 2) {
    linkStatus = '⚠️';
    score -= 5;
    issues.push('Low internal links');
  }

  // Word count
  const words = body.split(/\s+/).filter(w => w.length > 1).length;
  if (words < 500) {
    score -= 15;
    issues.push('Thin content (<500w)');
  }

  const url = `/${file.replace(/\.mdx?$/, '')}/`;
  const issuesStr = issues.length > 0 ? issues.join(', ') : 'None';

  console.log(`| \`${url}\` | **${score}/100** | ${titleStatus} | ${metaStatus} | ${hStatus} | ${linkStatus} (${internalLinks}) | ${words} | ${issuesStr} |`);
});
