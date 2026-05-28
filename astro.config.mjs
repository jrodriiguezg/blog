// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// Plugin personalizado para transformar bloques de código 'mermaid' en <div class="mermaid"> en tiempo de compilación
function remarkMermaid() {
	return (tree) => {
		function walk(node) {
			if (node.type === "code" && node.lang === "mermaid") {
				node.type = "html";
				node.value = `<div class="mermaid">${node.value}</div>`;
			}
			if (node.children) {
				node.children.forEach(walk);
			}
		}
		walk(tree);
	};
}

// https://astro.build/config
export default defineConfig({
	output: "static",
	i18n: {
		defaultLocale: "es",
		locales: ["es", "en"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	site: "https://example.com",
	markdown: {
		remarkPlugins: [remarkMermaid],
	},
	integrations: [mdx(), sitemap()],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});

