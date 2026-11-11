#!/usr/bin/env node
// Build-time prerendering. Renders every page in src/seo/site.js to static HTML
// so the first response already has the title, meta tags, canonical, JSON-LD,
// H1 and main copy. Also writes sitemap.xml and 404.html.
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { PAGES, NOT_FOUND, canonicalFor } from '../src/seo/site.js';

const webRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.resolve(webRoot, '../../dist/apps/web');
const ssrEntry = path.resolve(webRoot, '../../dist/ssr/entry-server.js');

// The SSR bundle is ESM; mark its folder so Node loads it without a warning.
fs.writeFileSync(path.join(path.dirname(ssrEntry), 'package.json'), '{"type":"module"}\n');
const { render } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');

if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> markers');
}

const fill = (url) => {
    const { html, head } = render(url);
    if (!html || html.length < 500) throw new Error(`Prerender of ${url} produced almost no HTML`);
    return template
        .replace(/<title>[\s\S]*?<\/title>\s*/, '') // the fallback title is replaced by the page's own
        .replace('<!--app-head-->', head)
        .replace('<!--app-html-->', html);
};

for (const page of [...PAGES, NOT_FOUND]) {
    const file = path.join(outDir, page.file);
    fs.writeFileSync(file, fill(page.path), 'utf8');
    console.log(`prerendered ${page.path} -> ${page.file}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url>
    <loc>${canonicalFor(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`sitemap.xml: ${PAGES.length} URLs`);

fs.rmSync(path.dirname(ssrEntry), { recursive: true, force: true });
