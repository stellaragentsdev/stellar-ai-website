#!/usr/bin/env node
// Build-time prerender for public routes. Runs after `vite build` (client) and
// `vite build --ssr` (server bundle). Writes:
//   dist/apps/web/index.html    -> /
//   dist/apps/web/careers.html  -> /careers  (served by .htaccess rewrite)
//   dist/apps/web/sitemap.xml
// The client bundle hydrates the prerendered markup; routing stays client-side.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.resolve(root, '../../dist/apps/web');
const ssrDir = path.resolve(root, '.ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const { PUBLIC_ROUTES, absoluteUrl } = await import(pathToFileURL(path.join(root, 'src/seo/routes.js')).href);

const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
	throw new Error('prerender: expected an empty <div id="root"></div> in the built index.html');
}

const routeFile = (route) => (route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`);

for (const route of PUBLIC_ROUTES) {
	const { html, head } = render(route);
	if (!html || !head.includes('<title')) throw new Error(`prerender: empty output for ${route}`);
	const page = template
		.replace(/<title>\s*<\/title>/, head)
		.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
	fs.writeFileSync(path.join(outDir, routeFile(route)), page);
	console.log(`prerendered ${route} -> ${routeFile(route)}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_ROUTES.map((r) => `  <url>\n    <loc>${absoluteUrl(r)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml');
fs.rmSync(ssrDir, { recursive: true, force: true });
