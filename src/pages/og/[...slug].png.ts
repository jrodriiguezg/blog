import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../utils/og-image';

export const prerender = true;

const categoryLabels: Record<string, Record<string, string>> = {
	es: {
		proyectos: 'Proyectos',
		divulgacion: 'Divulgación',
		miscelanea: 'Miscelánea',
		workstation: 'Workstation',
		infraestructura: 'Infraestructura',
	},
	en: {
		proyectos: 'Projects',
		divulgacion: 'Articles',
		miscelanea: 'Miscellaneous',
		workstation: 'Workstation',
		infraestructura: 'Infrastructure',
	},
};

export async function getStaticPaths() {
	const allPosts = await getCollection('blog');
	const posts = allPosts.filter((post) => !import.meta.env.PROD || !post.data.draft);

	const paths = posts.map((post) => {
		const isEn = post.id.startsWith('en/');
		const lang = isEn ? 'en' : 'es';
		const categoryKey = post.data.category;
		const categoryLabel = categoryLabels[lang]?.[categoryKey] || categoryKey;

		const d = post.data.pubDate;
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`;

		return {
			params: { slug: post.id },
			props: {
				title: post.data.title,
				category: categoryLabel,
				date: formattedDate,
				lang,
				isDefault: false,
			},
		};
	});

	// Imagen por defecto para páginas que no son posts (/og/default.png)
	paths.push({
		params: { slug: 'default' },
		props: {
			title: 'jrodriiguezg / blog',
			category: '',
			date: '',
			lang: 'es',
			isDefault: true,
		},
	});

	return paths;
}

export const GET: APIRoute = async ({ props }) => {
	const pngBuffer = await generateOgImage(props as any);

	return new Response(pngBuffer, {
		status: 200,
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
