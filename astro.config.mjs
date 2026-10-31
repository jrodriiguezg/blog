// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// Plugin personalizado para transformar bloques de código 'mermaid' en <div class="mermaid"> en tiempo de compilación
function remarkMermaid() {
	/** @param {any} tree */
	return (tree) => {
		/** @param {any} node */
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
	redirects: {
		"/about": "https://jrodriiguezg.link",
		"/en/about": "https://jrodriiguezg.link",
		"/blog/category/homelab": "/blog/category/infraestructura",
		"/en/blog/category/homelab": "/en/blog/category/infraestructura",
		"/en/blog/category/infrastructure": "/en/blog/category/infraestructura",
		"/blog/category/mi-pc": "/blog/category/workstation",
		"/en/blog/category/mi-pc": "/en/blog/category/workstation",
	},
	i18n: {
		defaultLocale: "es",
		locales: ["es", "en"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	site: "https://blog.jrodriiguezg.link",
	markdown: {
		remarkPlugins: [remarkMermaid],
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/404'),
		}),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});

