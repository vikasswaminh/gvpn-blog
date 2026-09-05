import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');

const updates = {
  "branch-office-vpn-smb-rollout-playbook-2026.md": {
    title: "Branch Office VPN Guide for SMBs (2026)",
    description: "A 2026 rollout playbook for setting up a branch office VPN. Compare legacy hardware to modern WireGuard networks for SMB multi-site connectivity.",
    primary: "Branch office VPN",
    secondary: ["SMB VPN", "multi-site network", "retail VPN"],
    linkFile: "sd-wan-alternatives-2026",
    linkText: "SD-WAN alternatives"
  },
  "cloud-wireguard-vpn-meshwg.md": {
    title: "Cloud WireGuard VPN: The MeshWG Architecture",
    description: "Deep dive into how a cloud-managed WireGuard VPN works. Learn about control planes, peer-to-peer encryption, and zero-trust mesh architecture.",
    primary: "Cloud WireGuard VPN",
    secondary: ["managed WireGuard", "mesh VPN architecture"],
    linkFile: "managed-vs-self-hosted-wireguard-vpn-2026",
    linkText: "managed vs self-hosted WireGuard"
  },
  "how-to-build-a-multi-location-wireguard-network-with-routers.md": {
    title: "Build a Multi-Location WireGuard Network Using Routers",
    description: "Step-by-step guide to building a scalable multi-location WireGuard network using standard business routers, no complex CLI or IPsec required.",
    primary: "Multi-location WireGuard",
    secondary: ["site-to-site mesh", "router VPN"],
    linkFile: "how-to-set-up-a-wireguard-mesh-vpn",
    linkText: "WireGuard mesh VPN setup"
  },
  "how-to-set-up-a-router-vpn-without-installing-vpn-software.md": {
    title: "Set Up a Router VPN Without Client Software",
    description: "Learn how to deploy a secure router VPN that protects entire branch networks without needing to install VPN client software on every device.",
    primary: "Router VPN",
    secondary: ["agentless VPN", "hardware VPN", "branch router"],
    linkFile: "wireguard-mesh-vpn-without-agent-existing-routers",
    linkText: "agentless WireGuard mesh"
  },
  "how-to-set-up-a-wireguard-mesh-vpn.md": {
    title: "How to Set Up a WireGuard Mesh VPN (Full Guide)",
    description: "A comprehensive guide on setting up a WireGuard mesh VPN. Compare manual configurations vs automated cloud control planes for scalable networks.",
    primary: "WireGuard mesh VPN",
    secondary: ["WireGuard setup", "full mesh VPN"],
    linkFile: "manage-multiple-wireguard-tunnels-mesh-vpn-2026",
    linkText: "managing multiple WireGuard tunnels"
  },
  "manage-multiple-wireguard-tunnels-mesh-vpn-2026.md": {
    title: "How to Manage Multiple WireGuard Tunnels at Scale",
    description: "Learn how to manage multiple WireGuard tunnels in a growing mesh network without config sprawl. Covers automation, BGP, and scaling strategies.",
    primary: "Manage WireGuard tunnels",
    secondary: ["WireGuard automation", "full mesh", "peer management"],
    linkFile: "wireguard-site-to-site-vpn-multiple-locations",
    linkText: "multi-location site-to-site VPN"
  },
  "managed-vs-self-hosted-wireguard-vpn-2026.md": {
    title: "Managed vs Self-Hosted WireGuard VPN: 2026 Comparison",
    description: "Compare self-hosted WireGuard vs managed cloud platforms. Evaluate kernel performance, NAT traversal, and management overhead for your network.",
    primary: "Managed vs self-hosted WireGuard",
    secondary: ["cloud WireGuard", "Netmaker", "Headscale"],
    linkFile: "wireguard-nat-traversal-cgnat-firewalls-2026",
    linkText: "WireGuard NAT traversal mechanics"
  },
  "mesh-vpn-vs-ipsec-vs-sdwan-2026.md": {
    title: "Mesh VPN vs IPsec vs SD-WAN: Which is Best in 2026?",
    description: "Compare Mesh VPN, IPsec, and SD-WAN architectures. Find out which network solution offers the best performance and cost for multi-site businesses.",
    primary: "Mesh VPN vs IPsec",
    secondary: ["SD-WAN comparison", "WireGuard vs IPsec"],
    linkFile: "sd-wan-alternatives-2026",
    linkText: "modern SD-WAN alternatives"
  },
  "sd-wan-alternatives-2026.md": {
    title: "7 Modern SD-WAN Alternatives for Branch Offices (2026)",
    description: "Looking beyond traditional SD-WAN? Discover 7 cost-effective SD-WAN alternatives for SMB branch connectivity and network management.",
    primary: "SD-WAN alternatives",
    secondary: ["WireGuard SD-WAN", "branch connectivity"],
    linkFile: "branch-office-vpn-smb-rollout-playbook-2026",
    linkText: "branch office VPN rollout"
  },
  "tp-link-site-to-site-vpn-wireguard-2026.md": {
    title: "TP-Link WireGuard Site-to-Site VPN Setup Guide",
    description: "Step-by-step guide to configuring a WireGuard site-to-site VPN on TP-Link routers. Bypass static IPs and complex IPsec configurations easily.",
    primary: "TP-Link site-to-site VPN",
    secondary: ["WireGuard on TP-Link", "router VPN setup"],
    linkFile: "how-to-set-up-a-router-vpn-without-installing-vpn-software",
    linkText: "router VPN without client software"
  },
  "wireguard-mesh-vpn-without-agent-existing-routers.md": {
    title: "Agentless WireGuard Mesh VPN on Existing Routers",
    description: "Deploy a WireGuard mesh VPN directly on existing TP-Link, MikroTik, or Ubiquiti routers without installing agents. Fast, CGNAT-native networking.",
    primary: "Agentless WireGuard mesh",
    secondary: ["WireGuard on router", "mesh VPN no agent"],
    linkFile: "how-to-build-a-multi-location-wireguard-network-with-routers",
    linkText: "build a multi-location network"
  },
  "wireguard-nat-traversal-behind-cgnat-2026.md": {
    title: "WireGuard NAT Traversal & CGNAT Setup Guide",
    description: "Complete engineering guide to WireGuard NAT traversal. Master UDP hole punching, PersistentKeepalive, and relay nodes to bypass firewalls.",
    primary: "WireGuard NAT traversal",
    secondary: ["CGNAT WireGuard", "VPN behind CGNAT"],
    linkFile: "how-to-set-up-a-wireguard-mesh-vpn",
    linkText: "WireGuard mesh setup"
  },
  "wireguard-nat-traversal-cgnat-firewalls-2026.md": {
    title: "WireGuard Behind Firewalls: NAT Traversal Explained",
    description: "(Duplicate/Alternate) Complete guide to bypassing CGNAT and firewalls with WireGuard. Learn UDP hole punching and endpoint management.",
    primary: "WireGuard CGNAT",
    secondary: ["WireGuard behind firewall", "PersistentKeepalive"],
    linkFile: "managed-vs-self-hosted-wireguard-vpn-2026",
    linkText: "managed WireGuard architecture"
  },
  "wireguard-site-to-site-vpn-how-it-works-2026.md": {
    title: "How WireGuard Site-to-Site VPN Works (2026 Protocol Guide)",
    description: "Understand the mechanics of WireGuard site-to-site VPNs. Learn how multi-site meshes, CGNAT handling, and control planes operate under the hood.",
    primary: "WireGuard site-to-site VPN",
    secondary: ["how WireGuard works", "VPN protocol"],
    linkFile: "wireguard-site-to-site-vpn-multiple-locations",
    linkText: "connecting multiple locations"
  },
  "wireguard-site-to-site-vpn-multiple-locations.md": {
    title: "Multi-Location WireGuard Site-to-Site VPN Setup",
    description: "Learn how to configure a multi-location WireGuard site-to-site VPN. Setup instructions for Linux, MikroTik, OpenWrt, and Ubiquiti routers.",
    primary: "Multi-location site-to-site VPN",
    secondary: ["multi-site setup", "subnet routing"],
    linkFile: "wireguard-site-to-site-vpn-how-it-works-2026",
    linkText: "how WireGuard site-to-site works"
  }
};

for (const [file, data] of Object.entries(updates)) {
  const filePath = path.join(blogDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace Title
  content = content.replace(/^title:\s*['"].*?['"]$/m, `title: '${data.title}'`);
  // Replace Description
  content = content.replace(/^description:\s*['"].*?['"]$/m, `description: '${data.description}'`);
  
  // Replace keywords
  const keywords = [data.primary, ...data.secondary].map(k => `"${k}"`).join(', ');
  content = content.replace(/^seoKeywords:\s*\[.*?\]$/m, `seoKeywords: [${keywords}]`);
  
  // Append internal link if not already there
  const linkString = `\n\n### Related Read\nFor more on this topic, read our guide on [${data.linkText}](/blog/${data.linkFile}/).`;
  if (!content.includes(`[${data.linkText}](/blog/${data.linkFile}/)`)) {
    content += linkString;
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
