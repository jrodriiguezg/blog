import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
	const posts = await getCollection('blog');
	const index = posts.map((post) => {
		const isEnglish = post.id.startsWith('en/');
		const cleanSlug = isEnglish ? post.id.replace(/^en\//, '') : post.id;
		const path = isEnglish ? `/en/blog/${cleanSlug}/` : `/blog/${cleanSlug}/`;
		
		return {
			title: post.data.title,
			description: post.data.description || '',
			category: post.data.category || 'miscelanea',
			tags: post.data.tags || [],
			path: path,
			lang: isEnglish ? 'en' : 'es',
		};
	});

	return new Response(JSON.stringify(index), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
		},
	});
}
