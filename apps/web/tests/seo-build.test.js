// Run after `npm run build`: verifies the built output carries real SEO signals
// in the initial HTML response (no JavaScript needed).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../dist/apps/web');
const read = (f) => fs.readFileSync(path.join(out, f), 'utf8');

const pages = [
	{ file: 'index.html', url: 'https://stellaragents.in/', h1: 'AI agents that do the busywork' },
	{ file: 'careers.html', url: 'https://stellaragents.in/careers', h1: 'Build the Future of AI Agents' },
];

for (const p of pages) {
	test(`${p.file} has title, description, canonical, OG and H1 in static HTML`, () => {
		const html = read(p.file);
		assert.match(html, /<title[^>]*>[^<]{10,}<\/title>/);
		assert.doesNotMatch(html, /<title><\/title>/);
		assert.match(html, /<meta[^>]*name="description"[^>]*content="[^"]{30,}"/);
		assert.ok(html.includes(`rel="canonical" href="${p.url}"`), 'canonical');
		assert.ok(html.includes(`property="og:url" content="${p.url}"`), 'og:url');
		assert.match(html, /<h1[^>]*>[^<]*/);
		assert.ok(html.includes(p.h1), 'h1 text');
		assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'exactly one h1');
	});
}

test('robots.txt is a real file pointing at the sitemap', () => {
	const robots = read('robots.txt');
	assert.match(robots, /^User-agent: \*/m);
	assert.match(robots, /^Sitemap: https:\/\/stellaragents\.in\/sitemap\.xml$/m);
	assert.doesNotMatch(robots, /<html/i);
});

test('sitemap.xml lists exactly the public routes', () => {
	const xml = read('sitemap.xml');
	assert.match(xml, /^<\?xml/);
	const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
	assert.deepEqual(locs, ['https://stellaragents.in/', 'https://stellaragents.in/careers']);
});

test('.htaccess serves real files before the SPA fallback and maps prerendered routes', () => {
	const ht = read('.htaccess');
	assert.ok(ht.indexOf('$1.html') < ht.lastIndexOf('/index.html'));
	assert.match(ht, /RewriteCond %\{REQUEST_FILENAME\} !-f/);
});
