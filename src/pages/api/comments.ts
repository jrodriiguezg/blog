import type { APIRoute } from 'astro';

// Indicamos a Astro que no prerenderice esta ruta en build, debe ser dinámica en servidor
export const prerender = false;

// Interfaz para la solicitud del POST
interface CommentRequest {
	slug: string;
	author?: string;
	content: string;
}

// GET: Recupera todos los comentarios de un post específico
export const GET: APIRoute = async ({ request, locals }) => {
	try {
		const url = new URL(request.url);
		const slug = url.searchParams.get('slug');

		if (!slug) {
			return new Response(JSON.stringify({ error: 'Falta el parámetro slug' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Acceso seguro al runtime de Cloudflare
		const env = (locals as any).runtime?.env;
		if (!env || !env.DB) {
			return new Response(JSON.stringify({ error: 'Binding de base de datos no configurado' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Consultar D1
		const { results } = await env.DB.prepare(
			'SELECT id, author_name, content, created_at FROM comments WHERE post_slug = ? ORDER BY created_at ASC'
		)
			.bind(slug)
			.all();

		return new Response(JSON.stringify(results || []), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error: any) {
		return new Response(JSON.stringify({ error: 'Error del servidor', details: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

// POST: Inserta un nuevo comentario
export const POST: APIRoute = async ({ request, locals }) => {
	try {
		const body: CommentRequest = await request.json();
		const { slug, author, content } = body;

		if (!slug || !content || content.trim() === '') {
			return new Response(JSON.stringify({ error: 'Campos requeridos vacíos o faltantes' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Sanitización muy básica del contenido (evitar XSS simple)
		const sanitizedContent = content
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#x27;');

		const authorName = author && author.trim() !== '' ? author.trim() : 'Anónimo';
		const sanitizedAuthor = authorName
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#x27;');

		// Acceso seguro al runtime de Cloudflare
		const env = (locals as any).runtime?.env;
		if (!env || !env.DB) {
			return new Response(JSON.stringify({ error: 'Binding de base de datos no configurado' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Insertar en D1
		const result = await env.DB.prepare(
			'INSERT INTO comments (post_slug, author_name, content) VALUES (?, ?, ?)'
		)
			.bind(slug, sanitizedAuthor, sanitizedContent)
			.run();

		if (result.success) {
			return new Response(JSON.stringify({ success: true, message: 'Comentario agregado con éxito' }), {
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			});
		} else {
			return new Response(JSON.stringify({ error: 'Fallo al guardar en la base de datos' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	} catch (error: any) {
		return new Response(JSON.stringify({ error: 'Error del servidor', details: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
