---
title: "My HomeLab: Spec Sheet & Services"
description: "A comprehensive detail of the physical infrastructure, local network topology, and interactive self-hosted services catalog."
pubDate: "May 29 2026"
heroImage: "/homelab-hero.png"
category: "homelab"
tags: ["computing", "docker", "linux", "networking", "services"]
pinned: true
---

# Introduction

As I have mentioned in previous posts, a **HomeLab** does not require thousands of dollars in rack servers or industrial hardware to be robust and highly functional. With a bit of skill, second-hand parts, and stable operating systems, we can build a great infrastructure at home.

This entry serves as a **unified control panel and spec sheet** for my entire lab. Here you will find the detailed hardware specs of each machine, the updated logical network diagram, and an interactive catalog with a built-in search filter to explore the services I have running in real-time.

If you want to see the step-by-step details of how I configured the parts of this network, here are the links to the full series:
- [**Introduction to my HomeLab - Setup and First Steps**](/en/blog/introduccion-al-homelab/)
- [**Networking Block I - Domains**](/en/blog/bloque-de-red-I)
- **Networking Block II - Services**
- **Management Block I - Administration**
- **Management Block II - Monitoring**
- **Services Block**
- **Tweaks, Backups, and Extras**

---

## Hardware Specifications

Currently, my lab is composed of two main physical nodes. Each serves a different and complementary role: the **Raspberry Pi 4B** acts as the node for essential services and low-power local networking, while the **HP Elitedesk 705 G3** (bought on Wallapop and upgraded with extra storage) handles the services with higher read, write, and multimedia computing demands.

<div class="nodes-specs">
<div class="node-spec-card">
<h3 class="node-title">Raspberry Pi 4B (4GB)</h3>
<p class="node-role">Essential Services & Primary DNS</p>
<hr class="flat-divider" />
<table class="specs-table">
<tr>
<td><strong>CPU</strong></td>
<td>Broadcom BCM2711 4 x 1.50Ghz (ARM)</td>
</tr>
<tr>
<td><strong>RAM</strong></td>
<td>4GB LPDDR4-3200</td>
</tr>
<tr>
<td><strong>O.S.</strong></td>
<td>Debian 12 Bookworm (RaspberryPiOS Lite)</td>
</tr>
<tr>
<td><strong>Storage</strong></td>
<td>Lexar 64GB MicroSD (OS & configurations)</td>
</tr>
<tr>
<td><strong>Average Draw</strong></td>
<td>~4W (Perfect for 24/7 uninterrupted uptime)</td>
</tr>
</table>
</div>

<div class="node-spec-card">
<h3 class="node-title">HP Elitedesk 705 G3</h3>
<p class="node-role">Intensive workloads & Multimedia</p>
<hr class="flat-divider" />
<table class="specs-table">
<tr>
<td><strong>CPU</strong></td>
<td>AMD PRO A10-8770E 4 x 3.08Ghz (x86_64)</td>
</tr>
<tr>
<td><strong>RAM</strong></td>
<td>16GB DDR4-SODIMM</td>
</tr>
<tr>
<td><strong>O.S.</strong></td>
<td>Debian 12 Bookworm (Stable Netinst)</td>
</tr>
<tr>
<td><strong>Storage</strong></td>
<td> Kingston SSD 128GB (Operating System)<br>
WD Blue NVMe 1TB (Movies & series)<br>
Aliexpress NVMe 512GB (Navidrome / Music)<br>
WD easystore 5TB (Backup Repository)</td>
</tr>
<tr>
<td><strong>Average Draw</strong></td>
<td>~15W - 25W (Excellent price-to-performance balance)</td>
</tr>
</table>
</div>
</div>

<style>
	.nodes-specs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin: 2rem 0;
	}
	.node-spec-card {
		background: #09090b;
		border: 1px solid #27272a;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
	}
	.node-title {
		margin-top: 0 !important;
		margin-bottom: 0.25rem !important;
		color: #f4f4f5 !important;
		font-size: 1.3rem !important;
	}
	.node-role {
		color: #71717a;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}
	.flat-divider {
		border: 0;
		height: 1px;
		background: #27272a;
		margin: 1rem 0;
	}
	.specs-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}
	.specs-table td {
		padding: 0.5rem 0;
		border-bottom: 1px solid rgba(39, 39, 42, 0.5);
		vertical-align: top;
		color: #e4e4e7;
	}
	.specs-table tr:last-child td {
		border-bottom: none;
	}
	.specs-table td:first-child {
		width: 35%;
		color: #a1a1aa;
	}
	@media (max-width: 768px) {
		.nodes-specs {
			grid-template-columns: 1fr;
		}
	}
</style>

---

## Interactive Logical Network Diagram

This logical diagram represents the connections in the lab. All incoming external traffic accesses securely through the **Cloudflared Tunnel** and is routed to the **Nginx Proxy Manager**, which filters and redirects internal requests to the corresponding node and port.

*(You can click and drag to move the diagram, or use your scroll wheel/touchpad pinch gestures to zoom into complex structures)*

<div class="interactive-diagram-wrapper" id="mermaid-interactive-container">
<div class="diagram-controls">
<button id="btn-zoom-in" title="Zoom In">＋</button>
<button id="btn-zoom-out" title="Zoom Out">－</button>
<button id="btn-zoom-reset" title="Reset Zoom">⊙</button>
</div>
<div class="diagram-pan-viewport" id="diagram-pan-viewport">
<div class="mermaid-diagram-content" id="mermaid-diagram-content">

```mermaid
flowchart TD
    %% Define Styles
    classDef extNode fill:#1a1a24,stroke:#8b5cf6,stroke-width:2px,color:#e9d5ff;
    classDef proxyNode fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#e0f2fe;
    classDef rpiNode fill:#1c1917,stroke:#f43f5e,stroke-width:2px,color:#ffe4e6;
    classDef eliteNode fill:#172554,stroke:#3b82f6,stroke-width:2px,color:#dbeafe;
    classDef vpnNode fill:#1e1b4b,stroke:#ec4899,stroke-width:2px,color:#fce7f3;

    %% WAN
    subgraph WAN ["External / Internet"]
        direction TB
        internet["Public Internet"]:::extNode
        tunnel["Cloudflared Tunnel"]:::extNode
        internet --> tunnel
    end

    %% Reverse Proxy
    subgraph Proxy ["Reverse Proxy"]
        npm["Proxy Manager<br>(Nginx Proxy Manager)<br>npm.jrodriiguezg.lan"]:::proxyNode
    end

    %% Raspberry Pi 4
    subgraph RPi4 ["Raspberry Pi 4 (Docker Node)"]
        phns1["phns1.jrodriiguezg.lan<br>(PiHole + Unbound / DNS 1)"]:::rpiNode
        wireguard["Tailscale / Wireguard<br>wireguard.jrodriiguezg.lan"]:::vpnNode
    end

    %% HP Elitedesk
    subgraph HP ["HP Elitedesk (Docker Node)"]
        phns2["phns2.jrodriiguezg.lan<br>(Secondary DNS 2)"]:::eliteNode
        navidrome["navidrome.jrodriiguezg.lan<br>(Navidrome / Streaming)"]:::eliteNode
    end

    %% Flows
    tunnel --> npm
    npm -.-> phns1
    npm -.-> phns2
    npm -.-> wireguard
    npm -.-> navidrome

    %% Subgraph Styles
    style WAN fill:none,stroke:#27272a,stroke-width:1px,color:#a1a1aa;
    style Proxy fill:none,stroke:#27272a,stroke-width:1px,color:#a1a1aa;
    style RPi4 fill:none,stroke:#f43f5e,stroke-width:1px,color:#fda4af;
    style HP fill:none,stroke:#3b82f6,stroke-width:1px,color:#93c5fd;
```

</div>
</div>
</div>

<style>
	.interactive-diagram-wrapper {
		position: relative;
		border: 1px solid #27272a;
		background: #040405;
		border-radius: 12px;
		height: 480px;
		overflow: hidden;
		margin: 2rem 0;
	}
	.diagram-controls {
		position: absolute;
		top: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		z-index: 10;
	}
	.diagram-controls button {
		background: #09090b;
		border: 1px solid #27272a;
		color: #a1a1aa;
		width: 36px;
		height: 36px;
		border-radius: 6px;
		cursor: pointer;
		font-weight: bold;
		font-size: 1.1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}
	.diagram-controls button:hover {
		border-color: var(--accent);
		color: #f4f4f5;
		background: #18181b;
	}
	.diagram-pan-viewport {
		width: 100%;
		height: 100%;
		cursor: grab;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.diagram-pan-viewport:active {
		cursor: grabbing;
	}
	.mermaid-diagram-content {
		transform-origin: center center;
		transition: transform 0.05s ease-out;
		user-select: none;
		pointer-events: none;
	}
	.mermaid-diagram-content svg {
		max-width: 100%;
		height: auto !important;
	}
	.uptime-status-card {
		background: #09090b;
		border: 1px solid #27272a;
		border-radius: 12px;
		padding: 1.5rem;
		margin: 2rem 0;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
	}
	.status-card-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.status-card-header h4 {
		margin: 0 !important;
		font-size: 1.2rem !important;
		color: #f4f4f5 !important;
	}
	.status-dot-pulse {
		width: 10px;
		height: 10px;
		background-color: #10b981;
		border-radius: 50%;
		display: inline-block;
		box-shadow: 0 0 8px #10b981;
		animation: status-pulse 2s infinite;
	}
	@keyframes status-pulse {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
		}
	}
	.uptime-status-card p {
		margin: 0;
		font-size: 0.95rem;
		color: #a1a1aa;
		line-height: 1.5;
	}
	.status-link-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: #18181b;
		border: 1px solid #27272a;
		color: #e4e4e7;
		padding: 0.6rem 1.25rem;
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s;
	}
	.status-link-btn:hover {
		background: var(--accent);
		border-color: var(--accent);
		color: white;
		box-shadow: 0 0 12px rgba(var(--accent-rgb, 53, 67, 235), 0.25);
	}
</style>

<script is:inline>
	// Inline dynamic script for Logical Network Diagram Pan & Zoom
	document.addEventListener('DOMContentLoaded', () => {
		const viewport = document.getElementById('diagram-pan-viewport');
		const content = document.querySelector('.mermaid-diagram-content');
		
		if (!viewport || !content) return;

		let scale = 1.6;
		let panX = 0;
		let panY = 0;
		let isDragging = false;
		let startX, startY;

		function updateTransform() {
			content.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
		}

		updateTransform();

		viewport.addEventListener('mousedown', (e) => {
			isDragging = true;
			viewport.style.cursor = 'grabbing';
			startX = e.clientX - panX;
			startY = e.clientY - panY;
		});

		window.addEventListener('mousemove', (e) => {
			if (!isDragging) return;
			panX = e.clientX - startX;
			panY = e.clientY - startY;
			updateTransform();
		});

		window.addEventListener('mouseup', () => {
			isDragging = false;
			if (viewport) viewport.style.cursor = 'grab';
		});

		viewport.addEventListener('wheel', (e) => {
			e.preventDefault();
			const zoomFactor = 0.1;
			if (e.deltaY < 0) {
				scale = Math.min(scale + zoomFactor, 6.0);
			} else {
				scale = Math.max(scale - zoomFactor, 0.25);
			}
			updateTransform();
		}, { passive: false });

		viewport.addEventListener('touchstart', (e) => {
			if (e.touches.length === 1) {
				isDragging = true;
				startX = e.touches[0].clientX - panX;
				startY = e.touches[0].clientY - panY;
			}
		});

		viewport.addEventListener('touchmove', (e) => {
			if (isDragging && e.touches.length === 1) {
				panX = e.touches[0].clientX - startX;
				panY = e.touches[0].clientY - startY;
				updateTransform();
			}
		});

		viewport.addEventListener('touchend', () => {
			isDragging = false;
		});

		document.getElementById('btn-zoom-in').addEventListener('click', () => {
			scale = Math.min(scale + 0.3, 6.0);
			updateTransform();
		});

		document.getElementById('btn-zoom-out').addEventListener('click', () => {
			scale = Math.max(scale - 0.3, 0.25);
			updateTransform();
		});

		document.getElementById('btn-zoom-reset').addEventListener('click', () => {
			scale = 1.6;
			panX = 0;
			panY = 0;
			updateTransform();
		});
	});
</script>

---

## Active Catalog of Self-Hosted Services

All services in the lab run isolated using **Docker** containers. Below I show the list of active services, specifying the physical node where they run, their internal/external visibility status, and their corresponding technical descriptions.

<div class="uptime-status-card">
	<div class="status-card-header">
		<span class="status-dot-pulse"></span>
		<h4>Live Status Dashboard</h4>
	</div>
	<p>
		The health, availability, and response times of all my self-hosted services are monitored in real-time using <strong>Uptime Kuma</strong>. Due to standard browser iframe security restrictions, please view the complete dashboard directly in its dedicated window.
	</p>
	<a href="https://internal-status.jrodriiguezg.link/status/pb-status" target="_blank" rel="noopener noreferrer" class="status-link-btn">
		<span>View HomeLab Status</span>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
	</a>
</div>

<div class="services-catalog">
<div class="catalog-header">
<input type="text" id="services-search" placeholder="Search by name, description, or tag (e.g. DNS, Media)..." autocomplete="off" />
<div class="catalog-filters" id="catalog-filters">
<button class="filter-tab active" data-filter="all">All</button>
<button class="filter-tab" data-filter="dns">DNS</button>
<button class="filter-tab" data-filter="media">Multimedia</button>
<button class="filter-tab" data-filter="management">Management</button>
<button class="filter-tab" data-filter="vpn">VPN</button>
</div>
</div>
<div class="services-grid" id="services-grid">
<!-- Dynamic services injection via JavaScript -->
</div>
</div>

<style>
	.services-catalog {
		margin: 2.5rem 0;
	}
	.catalog-header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}
	#services-search {
		background: #09090b;
		border: 1px solid #27272a;
		color: #f4f4f5;
		border-radius: 8px;
		padding: 0.75rem 1rem;
		width: 100%;
		font-size: 1rem;
		outline: none;
		transition: border-color 0.2s;
		font-family: inherit;
	}
	#services-search:focus {
		border-color: var(--accent);
	}
	.catalog-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.filter-tab {
		background: transparent;
		border: 1px solid #27272a;
		color: #a1a1aa;
		border-radius: 8px;
		padding: 0.4rem 0.85rem;
		font-size: 0.85rem;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s;
	}
	.filter-tab:hover {
		border-color: #3f3f46;
		color: #f4f4f5;
	}
	.filter-tab.active {
		background: var(--accent);
		border-color: var(--accent);
		color: white;
	}
	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.25rem;
		margin-top: 1.5rem;
	}
	.service-card {
		background: #09090b;
		border: 1px solid #27272a;
		border-radius: 12px;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		height: 100%;
		transition: border-color 0.2s, transform 0.2s;
	}
	.service-card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
	}
	.service-title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}
	.service-title {
		font-size: 1.15rem;
		font-weight: 600;
		color: #f4f4f5;
		margin: 0;
	}
	.status-badge {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		text-transform: uppercase;
		background: rgba(16, 185, 129, 15%);
		color: #10b981;
		border: 1px solid rgba(16, 185, 129, 30%);
	}
	.service-desc {
		font-size: 0.875rem;
		color: #a1a1aa;
		line-height: 1.4;
		margin: 0 0 1.25rem 0;
		flex-grow: 1;
	}
	.service-meta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	.meta-badge {
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.2rem 0.5rem;
		border-radius: 6px;
		background: rgba(39, 39, 42, 0.4);
		color: #e4e4e7;
		border: 1px solid #27272a;
	}
	.meta-badge.tag {
		color: var(--accent);
		border-color: rgba(var(--accent-rgb, 53, 67, 235), 0.3);
	}
	.meta-badge.host {
		color: #38bdf8;
		border-color: rgba(56, 189, 248, 0.3);
	}
	.meta-badge.host.rpi {
		color: #f43f5e;
		border-color: rgba(244, 63, 94, 0.3);
	}
	.meta-badge.visibility {
		color: #10b981;
		border-color: rgba(16, 185, 129, 0.3);
	}
	.meta-badge.visibility.private {
		color: #fb923c;
		border-color: rgba(251, 146, 60, 0.3);
	}
</style>

<script is:inline>
	// Local self-hosted services database
	const servicesList = [
		{
			name: "PiHole + Unbound (DNS 1)",
			category: "dns",
			host: "Raspberry Pi 4",
			hostClass: "rpi",
			description: "Primary local DNS server and network-wide ad blocker, integrated directly with Unbound upstream resolver.",
			visibility: "Private (LAN)",
			visibilityClass: "private"
		},
		{
			name: "Secondary DNS",
			category: "dns",
			host: "HP Elitedesk",
			hostClass: "hp",
			description: "Redundant secondary DNS server configured to preserve local navigation in case of node failure or maintenance.",
			visibility: "Private (LAN)",
			visibilityClass: "private"
		},
		{
			name: "Nginx Proxy Manager",
			category: "management",
			host: "Raspberry Pi 4",
			hostClass: "rpi",
			description: "Graphical reverse proxy managing automated Let's Encrypt SSL certificates and routing incoming WAN traffic.",
			visibility: "Hybrid (Public/LAN)",
			visibilityClass: "public"
		},
		{
			name: "Tailscale VPN",
			category: "vpn",
			host: "Raspberry Pi 4",
			hostClass: "rpi",
			description: "Secure, encrypted remote mesh VPN connectivity to manage the lab environment safely from outside the intranet.",
			visibility: "Private (VPN)",
			visibilityClass: "private"
		},
		{
			name: "Navidrome",
			category: "media",
			host: "HP Elitedesk",
			hostClass: "hp",
			description: "Lightweight Subsonic-compatible music streaming server. Hosts my entire high-speed music library on NVMe storage.",
			visibility: "Public (WAN)",
			visibilityClass: "public"
		},
		{
			name: "Cloudflared Tunnel",
			category: "management",
			host: "Raspberry Pi 4",
			hostClass: "rpi",
			description: "Secure encrypted tunnel that exposes selected local services (e.g. Navidrome) over the Cloudflare edge network without port forwarding.",
			visibility: "Public (WAN)",
			visibilityClass: "public"
		}
	];

	// Interactive search and filtering logic
	document.addEventListener('DOMContentLoaded', () => {
		const searchInput = document.getElementById('services-search');
		const grid = document.getElementById('services-grid');
		const filterTabs = document.querySelectorAll('.filter-tab');

		let activeFilter = 'all';

		function renderServices() {
			const query = searchInput.value.toLowerCase().trim();
			
			const filtered = servicesList.filter(service => {
				const matchesFilter = activeFilter === 'all' || service.category === activeFilter;
				
				const matchesSearch = service.name.toLowerCase().includes(query) ||
									  service.description.toLowerCase().includes(query) ||
									  service.category.toLowerCase().includes(query) ||
									  service.host.toLowerCase().includes(query);
				
				return matchesFilter && matchesSearch;
			});

			if (filtered.length === 0) {
				grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #71717a; padding: 2rem; font-style: italic;">No services found matching your search criteria.</p>`;
				return;
			}

			grid.innerHTML = filtered.map(service => {
				return `
					<div class="service-card">
						<div class="service-title-row">
							<h4 class="service-title">${service.name}</h4>
							<span class="status-badge">Active</span>
						</div>
						<p class="service-desc">${service.description}</p>
						<div class="service-meta-row">
							<span class="meta-badge tag">${service.category.toUpperCase()}</span>
							<span class="meta-badge host ${service.hostClass}">${service.host}</span>
							<span class="meta-badge visibility ${service.visibilityClass}">${service.visibility}</span>
						</div>
					</div>
				`;
			}).join('');
		}

		searchInput.addEventListener('input', renderServices);

		filterTabs.forEach(tab => {
			tab.addEventListener('click', () => {
				filterTabs.forEach(t => t.classList.remove('active'));
				tab.classList.add('active');
				activeFilter = tab.getAttribute('data-filter');
				renderServices();
			});
		});

		renderServices();
	});
</script>
