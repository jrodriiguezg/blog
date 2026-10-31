#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

function getHtmlFiles(dir) {
	let results = [];
	if (!fs.existsSync(dir)) return results;
	const list = fs.readdirSync(dir);
	for (const file of list) {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);
		if (stat && stat.isDirectory()) {
			results = results.concat(getHtmlFiles(fullPath));
		} else if (file.endsWith('.html')) {
			results.push(fullPath);
		}
	}
	return results;
}

const htmlFiles = getHtmlFiles(DIST_DIR);
let warningCount = 0;
const warnings = [];

for (const file of htmlFiles) {
	const relPath = path.relative(DIST_DIR, file);
	// Ignorar páginas de error como 404
	if (relPath === '404.html') continue;

	const content = fs.readFileSync(file, 'utf8');

	// Ignorar páginas de redirección generadas por Astro.redirect
	if (content.includes('http-equiv="refresh"')) continue;

	// 1. Validar meta author
	const authorMatch = content.match(/<meta\s+name=["']author["']\s+content=["']([^"']*)["']/i);
	if (!authorMatch || !authorMatch[1].trim()) {
		warnings.push(`[SEO WARN] /${relPath}: Falta <meta name="author">`);
		warningCount++;
	}

	// 2. Validar imagen social (og:image)
	const ogImageMatch = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
	if (!ogImageMatch || !ogImageMatch[1].trim()) {
		warnings.push(`[SEO WARN] /${relPath}: Falta <meta property="og:image">`);
		warningCount++;
	}

	// 3. Validar longitud de meta description (100 - 160 caracteres)
	const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
	if (!descMatch || !descMatch[1].trim()) {
		warnings.push(`[SEO WARN] /${relPath}: Falta meta description`);
		warningCount++;
	} else {
		const desc = descMatch[1].trim();
		const len = desc.length;
		if (len < 100) {
			warnings.push(`[SEO WARN] /${relPath}: Description corta (${len} caracteres < 100): "${desc}"`);
			warningCount++;
		} else if (len > 160) {
			warnings.push(`[SEO WARN] /${relPath}: Description larga (${len} caracteres > 160): "${desc.slice(0, 60)}..."`);
			warningCount++;
		}
	}
}

console.log('\n--- Auditoría Automática de SEO (Control de Build) ---');
if (warnings.length > 0) {
	warnings.forEach((w) => console.warn(`\x1b[33m${w}\x1b[0m`));
	console.log(`\x1b[33mTotal: ${warningCount} advertencias en ${htmlFiles.length} páginas analizadas (Build no interrumpido).\x1b[0m\n`);
} else {
	console.log(`\x1b[32m✓ Todas las páginas (${htmlFiles.length}) cumplen con autor, imagen social y longitud de descripción (100-160 caracteres).\x1b[0m\n`);
}

// Salir siempre con 0 para no romper el build
process.exit(0);
