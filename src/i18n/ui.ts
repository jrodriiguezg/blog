export const languages = {
	es: 'Español',
	en: 'English',
};

export const defaultLang = 'es';

export const ui = {
	es: {
		'nav.home': 'Inicio',
		'nav.blog': 'Blog',
		'nav.about': 'Sobre mí',
		'footer.by': 'By',
		'blog.categories': 'Categorías',
		'blog.tags': 'Etiquetas',
		'blog.noPosts': 'No hay publicaciones disponibles en este idioma.',
		'blog.filterByCategory': 'Filtrando por categoría:',
		'blog.filterByTag': 'Filtrando por etiqueta:',
		'blog.backToBlog': '← Volver al blog',
		'comments.title': 'Comentarios',
		'comments.loading': 'Cargando comentarios...',
		'comments.noComments': 'No hay comentarios aún. ¡Sé el primero en comentar!',
		'comments.writeAnonymous': 'Escribir un comentario anónimo',
		'comments.authorLabel': 'Nombre o Apodo (Opcional)',
		'comments.authorPlaceholder': 'Anónimo',
		'comments.contentLabel': 'Mensaje',
		'comments.contentPlaceholder': 'Escribe tu comentario aquí...',
		'comments.submit': 'Enviar comentario',
		'comments.submitting': 'Enviando...',
		'comments.success': '¡Comentario publicado con éxito!',
		'comments.error': 'Error al enviar el comentario.',
		'comments.connError': 'Error de conexión. Inténtalo de nuevo.',
		'about.title': 'Sobre mí',
		'about.tech': 'Tecnologías y herramientas',
		'about.projects': 'Proyectos destacados',
		'about.contact': 'Contacto y perfiles',
		'home.title': 'Bienvenido',
	},
	en: {
		'nav.home': 'Home',
		'nav.blog': 'Blog',
		'nav.about': 'About me',
		'footer.by': 'By',
		'blog.categories': 'Categories',
		'blog.tags': 'Tags',
		'blog.noPosts': 'No posts available in this language.',
		'blog.filterByCategory': 'Filtering by category:',
		'blog.filterByTag': 'Filtering by tag:',
		'blog.backToBlog': '← Back to blog',
		'comments.title': 'Comments',
		'comments.loading': 'Loading comments...',
		'comments.noComments': 'No comments yet. Be the first to comment!',
		'comments.writeAnonymous': 'Write an anonymous comment',
		'comments.authorLabel': 'Name or Nickname (Optional)',
		'comments.authorPlaceholder': 'Anonymous',
		'comments.contentLabel': 'Message',
		'comments.contentPlaceholder': 'Write your comment here...',
		'comments.submit': 'Send comment',
		'comments.submitting': 'Sending...',
		'comments.success': 'Comment posted successfully!',
		'comments.error': 'Error sending the comment.',
		'comments.connError': 'Connection error. Please try again.',
		'about.title': 'About me',
		'about.tech': 'Technologies & Tools',
		'about.projects': 'Featured Projects',
		'about.contact': 'Contact & Profiles',
		'home.title': 'Welcome',
	},
} as const;

// Helper para extraer el idioma activo de la URL
export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

// Helper para traducir cadenas fijas
export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof typeof ui[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

// Helper para generar enlaces locales correctamente
export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		if (l === defaultLang) {
			return cleanPath;
		}
		return `/en${cleanPath === '/' ? '' : cleanPath}`;
	};
}
