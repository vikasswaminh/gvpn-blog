import fs from 'fs';
const file = 'src/content/blog/how-wireguard-mesh-control-plane-manages-keys-peers-routes.md';
let md = fs.readFileSync(file, 'utf8');
const startText = 'creates catastrophic <div class="arch-diagram-box"';
const endText = '</svg>';
const startIndex = md.indexOf(startText);
const endIndex = md.indexOf(endText) + endText.length;
const newMd = md.substring(0, startIndex) + 'creates catastrophic consequences.\n\n![WireGuard Control Plane vs. Data Plane Architecture](/mesh-architecture.svg)' + md.substring(endIndex);
fs.writeFileSync(file, newMd);
