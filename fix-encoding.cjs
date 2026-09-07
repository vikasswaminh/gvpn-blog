const fs = require('fs');
const path = require('path');

const mdPath = path.join('c:', 'Users', 'DELL 3511 (243597)', 'Downloads', 'gvpn-blog', 'src', 'content', 'blog', 'how-wireguard-mesh-control-plane-manages-keys-peers-routes.md');

let content = fs.readFileSync(mdPath, 'utf8');

const replacements = {
  'â€”': '—',
  'â€™': '’',
  'Â·': '·',
  'â”‚': '│',
  'â”€': '─',
  'â”': '┐',
  'â””': '└',
  'â”˜': '┘',
  'â”Œ': '┌',
  'â—„': '◄',
  'â–º': '►',
  'â€œ': '“',
  'â€ ': '”',
  'â€': '”',
};

for (const [bad, good] of Object.entries(replacements)) {
  content = content.split(bad).join(good);
}

fs.writeFileSync(mdPath, content, 'utf8');
console.log('Fixed character encoding.');
