const fs = require('fs');
const path = require('path');

const mdPath = path.join('c:', 'Users', 'DELL 3511 (243597)', 'Downloads', 'gvpn-blog', 'src', 'content', 'blog', 'how-wireguard-mesh-control-plane-manages-keys-peers-routes.md');

let content = fs.readFileSync(mdPath, 'utf8');

// The replacements for corrupted CP-1252 characters
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
  'â€': '”',
  'â€': '”',
  '€': '' // the stray euro symbol before the box drawing seems like corruption
};

for (const [bad, good] of Object.entries(replacements)) {
  content = content.split(bad).join(good);
}

// Extract SVG and replace with markdown image
const svgStart = content.indexOf('<svg');
const svgEndStr = '</svg>';
const svgEnd = content.indexOf(svgEndStr) + svgEndStr.length;

if (svgStart !== -1 && svgEnd !== -1) {
  let svgContent = content.substring(svgStart, svgEnd);
  const svgOutPath = path.join('c:', 'Users', 'DELL 3511 (243597)', 'Downloads', 'gvpn-blog', 'public', 'mesh-architecture.svg');
  fs.writeFileSync(svgOutPath, svgContent, 'utf8');
  console.log('Saved SVG to ' + svgOutPath);
  
  // Replace the whole div enclosing the SVG with the image link
  const divStart = content.lastIndexOf('<div class="arch-diagram-box"', svgStart);
  const divEndStr = '</div>';
  // Note: There are two closing divs. One for the inner div, one for the outer arch-diagram-box.
  // The structure is:
  // <div class="arch-diagram-box" ...>
  //   <div ...>Text</div>
  //   <svg>...</svg>
  // </div>
  // Let's find the closing div of the outer box.
  let outerDivEnd = content.indexOf('</div>', svgEnd); // this finds the first </div> after </svg>, which is the outer one.
  if (outerDivEnd !== -1) {
      outerDivEnd += divEndStr.length;
      content = content.substring(0, divStart) + '![Architecture diagram](/mesh-architecture.svg)' + content.substring(outerDivEnd);
  }
}

fs.writeFileSync(mdPath, content, 'utf8');
console.log('Fixed markdown file.');
