import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/content/blog/manage-multiple-wireguard-tunnels-mesh-vpn-2026.md');
let content = fs.readFileSync(file, 'utf8');

// Replace heading numbering like "## 1. Problem Statement" to "## Problem Statement"
// Also handles "### 4.1 The Mathematical Reality" to "### The Mathematical Reality"
content = content.replace(/^(#+)\s+(?:\d+\.)+(?:\d+)?\s+/gm, '$1 ');

fs.writeFileSync(file, content, 'utf8');
console.log('Removed numbering from headings.');
